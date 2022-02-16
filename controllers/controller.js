/** @format */

const res = require('express/lib/response');
const {
	selectTopics,
	selectArticleById,
	selectUsers,
	patchArticle,
	selectArticles,
	doesResourceExist,
	selectCommentsByArticle,
} = require('../models/model.js');

exports.fetchTopics = (req, res, next) => {
	selectTopics().then((topics) => {
		res.status(200).send({ topics });
	});
};

exports.fetchArticles = (req, res, next) => {
	selectArticles().then((articles) => {
		res.status(200).send({ articles });
	});
};

exports.fetchArticleById = (req, res, next) => {
	const articleId = req.params.article_id;
	Promise.all([
		selectArticleById(articleId),
		doesResourceExist('articles', 'article_id', articleId),
	])
		.then(([article]) => {
			res.status(200).send({ article });
		})
		.catch(next);
};

exports.fetchUsers = (req, res, next) => {
	selectUsers().then((users) => {
		res.status(200).send({ users });
	});
};

exports.updateArticle = (req, res, next) => {
	const { inc_votes } = req.body;
	const articleId = req.params.article_id;

	patchArticle(inc_votes, articleId)
		.then((article) => {
			res.status(200).send({ article });
		})
		.catch(next);
};

exports.fetchCommentsByArticle = (req, res, next) => {
	const articleId = req.params.article_id;
	Promise.all([
		selectCommentsByArticle(articleId),
		doesResourceExist('articles', 'article_id', articleId),
	])
		.then(([comments]) => {
			res.status(200).send({ comments });
		})
		.catch(next);
};
