import { helloWorld } from '../services/helloWorld';
import { Context } from 'koa';

export async function getHelloWorld( ctx: Context): Promise<void> {
    ctx.body = await helloWorld();
    ctx.status = 200;
}