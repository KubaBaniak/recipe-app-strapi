/**
 * recipe service
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreService('api::recipe.recipe', {
  async create(ctx) {
    const data = ctx.request.body.data;
    data.author = ctx.state.user;
    const result = await super.create({ data });
    return result;
  },
});
