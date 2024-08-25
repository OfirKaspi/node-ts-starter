import express from 'express';
import { get, merge } from 'lodash';

import { getUsersBySessionToken } from '../db/users';

export const isOwnerOrAdmin = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const { id } = req.params
        const currentUserId = get(req, 'identity._id') as string
        const isAdmin = get(req, 'identity.isAdmin') as boolean

        if (!currentUserId) return res.sendStatus(403)

        console.log(req)

        if (currentUserId.toString() !== id || isAdmin) return res.sendStatus(403)

        return next()
    } catch (error) {
        console.log(error)
        return res.sendStatus(400)
    }
}

export const isAuthenticated = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const sessionToken = req.cookies[process.env.AUTH_TOKEN]

        if (!sessionToken) return res.sendStatus(403)

        const existingUser = await getUsersBySessionToken(sessionToken)

        if (!existingUser) return res.sendStatus(403)

        merge(req, { identity: { _id: existingUser._id.toString(), isAdmin: existingUser.isAdmin } })

        return next()
    } catch (error) {
        console.log(error)
        return res.sendStatus(400)
    }
}
