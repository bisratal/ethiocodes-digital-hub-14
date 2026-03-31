const { BlogPost, User, Media } = require('../../models');
const { Op } = require('sequelize');
const logger = require('../../utils/logger');

const createSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

const getPosts = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, status, category, tag, search } = req.query;
    const offset = (page - 1) * limit;
    
    const where = {};
    
    // Only show published posts to public
    if (!req.user) {
      where.status = 'Published';
    } else if (status) {
      where.status = status;
    }
    
    if (category) where.category = category;
    if (search) {
      where[Op.or] = [
        { title: { [Op.iLike]: `%${search}%` } },
        { content: { [Op.iLike]: `%${search}%` } },
        { excerpt: { [Op.iLike]: `%${search}%` } },
      ];
    }
    
    if (tag) {
      where.tags = { [Op.iLike]: `%${tag}%` };
    }
    
    const { count, rows } = await BlogPost.findAndCountAll({
      where,
      include: [
        { model: User, as: 'author', attributes: ['id', 'name', 'email'] },
        { model: Media, as: 'featuredImage', attributes: ['id', 'url', 'name'] },
      ],
      order: [['created_at', 'DESC']],
      limit: parseInt(limit),
      offset,
    });
    
    res.json({
      posts: rows,
      pagination: {
        total: count,
        page: parseInt(page),
        pages: Math.ceil(count / limit),
      },
    });
  } catch (error) {
    next(error);
  }
};

const getPostBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;
    
    const post = await BlogPost.findOne({
      where: { slug },
      include: [
        { model: User, as: 'author', attributes: ['id', 'name', 'email'] },
        { model: Media, as: 'featuredImage', attributes: ['id', 'url', 'name'] },
      ],
    });
    
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    
    // Increment view count
    await post.increment('view_count');
    
    res.json(post);
  } catch (error) {
    next(error);
  }
};

const getPostById = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const post = await BlogPost.findByPk(id, {
      include: [
        { model: User, as: 'author', attributes: ['id', 'name', 'email'] },
        { model: Media, as: 'featuredImage', attributes: ['id', 'url', 'name'] },
      ],
    });
    
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    
    res.json(post);
  } catch (error) {
    next(error);
  }
};

const createPost = async (req, res, next) => {
  try {
    const { title, content, excerpt, status, category, tags, featured_image_id } = req.body;
    
    const slug = createSlug(title);
    
    // Check for duplicate slug
    const existing = await BlogPost.findOne({ where: { slug } });
    if (existing) {
      return res.status(400).json({ error: 'A post with similar title already exists' });
    }
    
    const post = await BlogPost.create({
      title,
      slug,
      content,
      excerpt,
      author_id: req.user.id,
      status,
      category,
      tags,
      featured_image_id,
      published_at: status === 'Published' ? new Date() : null,
    });
    
    logger.info(`Blog post created: ${post.title} by ${req.user.email}`);
    
    res.status(201).json(post);
  } catch (error) {
    next(error);
  }
};

const updatePost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, content, excerpt, status, category, tags, featured_image_id } = req.body;
    
    const post = await BlogPost.findByPk(id);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    
    const updateData = {
      content,
      excerpt,
      status,
      category,
      tags,
      featured_image_id,
    };
    
    if (title && title !== post.title) {
      updateData.title = title;
      updateData.slug = createSlug(title);
      
      // Check for duplicate slug
      const existing = await BlogPost.findOne({
        where: { slug: updateData.slug, id: { [Op.ne]: id } },
      });
      if (existing) {
        return res.status(400).json({ error: 'A post with similar title already exists' });
      }
    }
    
    if (status === 'Published' && post.status !== 'Published') {
      updateData.published_at = new Date();
    }
    
    await post.update(updateData);
    
    logger.info(`Blog post updated: ${post.title} by ${req.user.email}`);
    
    res.json(post);
  } catch (error) {
    next(error);
  }
};

const deletePost = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const post = await BlogPost.findByPk(id);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    
    await post.destroy();
    
    logger.info(`Blog post deleted: ${post.title} by ${req.user.email}`);
    
    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    next(error);
  }
};

const getCategories = async (req, res, next) => {
  try {
    const categories = await BlogPost.findAll({
      attributes: ['category'],
      where: { category: { [Op.ne]: null } },
      group: ['category'],
    });
    
    res.json(categories.map(c => c.category));
  } catch (error) {
    next(error);
  }
};

const getTags = async (req, res, next) => {
  try {
    const posts = await BlogPost.findAll({
      attributes: ['tags'],
      where: { tags: { [Op.ne]: null } },
    });
    
    const tagSet = new Set();
    posts.forEach(post => {
      if (post.tags) {
        post.tags.forEach(tag => tagSet.add(tag.trim()));
      }
    });
    
    res.json(Array.from(tagSet));
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getPosts,
  getPostBySlug,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  getCategories,
  getTags,
};