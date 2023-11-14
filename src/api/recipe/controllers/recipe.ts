/**
 * recipe controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::recipe.recipe', {
  async create(ctx) {
    return await strapi.services['api::recipe.recipe'].create(ctx);
  },
});
