const { Router } = require("express");
const { PostModel } = require("../models/post.model");
const PostRouter = Router();

PostRouter.post("/api/blogs", async (req, res) => {
  try {
    let Blog = await new PostModel(req.body);
    Blog.save();
    res.status(200).json({ msg: "Blog Added", addBlog: Blog });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

PostRouter.get("/api/blogs", async (req, res) => {
  try {
    const { category, sortBy, searchTerm, page, pageSize } = req.query;

    const query = {};

    if (category) {
      query.category = category;
    }

    const sortOptions = {};

    if (sortBy) {
      sortOptions[sortBy] = 1;
    }

    const skip = (parseInt(page, 10) || 1 - 1) * (parseInt(pageSize, 10) || 10);

    if (searchTerm) {
      query.$text = { $search: searchTerm };
    }

    const Posts = await PostModel.find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(parseInt(pageSize, 10) || 10)
      .exec();

    res.status(200).json(Posts);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

PostRouter.get("/api/blogs?title=Present", async (req, res) => {
  try {
    const { title } = req.query;
    const query = {};
    if (title) {
      query.title = title;
    }
    const blogTitlw = await PostModel.find(query);
    res.status(200).json(blogTitlw);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

PostRouter.get("/api/blogs?category=tech", async (req, res) => {
  try {
    const { category } = req.query;
    const query = {};
    if (category) {
      query.category = category;
    }
    const blogs = await PostModel.find(query);
    res.status(200).json(blogs);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

PostRouter.get("/api/blogs?sort=date&order=asc", async (req, res) => {
  try {
    const { sortBy, page, pageSize } = req.query;

    const sortOption = {};
    if (sortBy) {
      sortOption[sortBy] = 1;

      const skip =
        (parseInt(page, 10) || 1 - 1) * (parseInt(pageSize, 10) || 10);
    }
    const blogs = await PostModel.find(query)
      .sort(sortOption)
      .skip(skip)
      .limit(parseInt(pageSize, 10) || 10);
    res.status(200).json(blogs);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

PostRouter.patch("/api/blogs/:id", async (req, res) => {
  const { id } = req.params;
  try {
    let blogs = await PostModel.findByIdAndUpdate({ _id: id }, req.body);
    res.status(200).json({ msg: "blogs Updated" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

PostRouter.delete("/api/blogs/:id", async (req, res) => {
  const { id } = req.params;
  try {
    let blogs = await PostModel.findByIdAndDelete(id);
    res.status(200).json({ msg: "blogs Deleted" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = { PostRouter };
