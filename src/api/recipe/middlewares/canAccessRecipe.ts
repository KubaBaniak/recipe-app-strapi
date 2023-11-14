import { Attribute } from '@strapi/strapi';

const isLoggedIn = (ctx): boolean => {
  if (!ctx.state.user) {
    ctx.unauthorized('You must be logged in to perform this action.');
    return false;
  }
  return true;
};

const findRecipeById = async (
  ctx,
  recipeId: number,
): Promise<Attribute.GetValues<'api::recipe.recipe'>> => {
  if (!recipeId) {
    ctx.notFound('Recipe not found');
    return null;
  }

  const recipe = await strapi.entityService.findOne(
    'api::recipe.recipe',
    recipeId,
    { populate: '*' },
  );

  if (!recipe) {
    ctx.notFound('Recipe not found');
    return null;
  }

  return recipe;
};

const isAuthorOrAdmin = (
  ctx,
  recipe: Attribute.GetValues<'api::recipe.recipe'>,
): boolean => {
  const role = ctx.state.user.role.name;
  const recipeAuthorId = (recipe.author as { id: number }).id;
  const userId = ctx.state.user.id;
  if (role === 'admin' || recipeAuthorId === userId) {
    return true;
  }

  ctx.unauthorized('You must be logged in to perform this action.');
  return false;
};

export default () => {
  return async (ctx, next) => {
    if (!isLoggedIn(ctx)) {
      return;
    }

    const recipeId = ctx.params.id;
    const recipe = await findRecipeById(ctx, recipeId);

    if (isAuthorOrAdmin(ctx, recipe)) {
      await next();
    }
  };
};
