import { PrismaClient } from "@prisma/client";

export function softDeleteMiddleware(prisma: PrismaClient) {
    prisma.$use(async (params, next) => {
        if (params.action == 'findFirst' || params.action == 'findMany' || params.action == 'count')
            params.args = {
                ...params.args,
                where: {
                    ...params?.args?.where,
                    deleted_at: null
                }
            }

        if (params.action == 'delete') {
            params.action = 'update'
            params.args.data = {
                deleted_at: new Date()
            }
        }

        return next(params)
    })
}