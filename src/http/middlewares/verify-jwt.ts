import { FastifyReply, FastifyRequest } from 'fastify';

export async function verifyJWT(
  request: FastifyRequest,
  reply: FastifyReply
): Promise<void> {
  try {
    await request.jwtVerify();
  } catch (error) {
    return reply.status(401).send({
      statusCode: 401,
      errorCode: 'UNAUTHORIZED',
      message: 'Unauthorized.',
    });
  }
}
