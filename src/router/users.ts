import express from 'express';

import { deleteUser, getAllUsers, updateUser } from '../controllers/users';
import { isAuthenticated, isOwnerOrAdmin } from '../middlewares';

export default (router: express.Router) => {
    router.get('/users', isAuthenticated, getAllUsers)
    router.delete('/users/:id', isAuthenticated, isOwnerOrAdmin, deleteUser)
    router.patch('/users/:id', isAuthenticated, isOwnerOrAdmin, updateUser)
}