const router = require('express').Router();
const categoryCtrl = require('../controllers/categoryController');
const authenticateUser = require('../main/authenteficate');
const authenticateAdmin = require('../main/authenteficateAdmin');

router.get('/', categoryCtrl.getAllCategoriesWithPagination);
router.get('/all', authenticateUser, categoryCtrl.getAllCategories);
router.get('/:categoryId', authenticateUser, categoryCtrl.getCategoryById);
router.get('/:categoryId/posts', authenticateUser, categoryCtrl.getPostsByCategoryId);
router.post('/', authenticateUser, categoryCtrl.getCategoryById);
router.patch('/:categoryId', authenticateUser, authenticateAdmin, categoryCtrl.updateCategoryById);
router.delete('/:categoryId', authenticateUser, authenticateAdmin, categoryCtrl.deleteCategoryById);

module.exports = router;
