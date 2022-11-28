/*

Create user to store in database

*/


// TODO: below is old code from 557 project

// const router = require('express').Router();
// let ObjectId = require('mongodb').ObjectID;
// let Post = require('../Schemas/Post.model');

// // param in body - postId,
// router.route('/').get(async (req, res) => {
//   console.log('GET post by id');
//   console.log(req.body.postId);
//   if (!req.body.postId) {
//     res.status(400).json({ message: 'invalid input, post requires postId' });
//   }
//   await Post.findOne({ id: ObjectId(req.body.postId) }, (err, result) => {
//     if (err) {
//       console.log('get post.id -- error');
//       res.status(400).json({ error: err.message });
//       return;
//     } else {
//       if (result) {
//         console.log('get post.id -- success');
//         res.status(200).json({
//           message: 'success',
//           post: result,
//         });
//         return;
//       } else {
//         console.log('get post -- post not found');
//         res.status(404).json({ error: 'post not found' });
//         return;
//       }
//     }
//   });
// });