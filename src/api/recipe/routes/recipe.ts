/**
 * recipe router
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::recipe.recipe', {
  config: {
    update: {
      middlewares: ['api::recipe.can-access-recipe'],
    },
    delete: {
      middlewares: ['api::recipe.can-access-recipe'],
    },
  },
});
