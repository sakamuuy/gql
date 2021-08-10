import { Context } from '../../context'

export const allUsers = (_: any, __: any, context: Context) => {
  return context.prisma.user.findMany()
}