import { Entity } from "../models/Entity";
import { Product } from "../models/Products";
import { ProductsState } from "./products.reducer";

export interface EntityState<T extends Entity = Entity> {
  byId: {
    [id: string]: T;
  };
  imageCover?: {
    [id: string]: string;
  };
  imageFront?: {
    [id: string]: string;
  };
  image1?: {
    [id: string]: string;
  };
  image2?: {
    [id: string]: string;
  };
  image3?: {
    [id: string]: string;
  };
}

export const getIds = (entities: Entity[]) => {
  return entities.map((e) => e._id);
};

export const addOne = (state: EntityState, entity: Entity) => {
  return { ...state, byId: { [entity._id]: entity } };
};

export const addMany = (state: EntityState, entities: Entity[]) => {
  if (entities.length === 0) {
    return state;
  }

  const entityMap = entities.reduce((prev, entity) => {
    return { ...prev, [entity._id]: entity };
  }, {});

  return {
    ...state,

    byId: { ...state.byId, ...entityMap },
  };
};

export const addImgFront = (state: ProductsState, entities: Product[]) => {
  if (entities.length === 0) {
    return state;
  }

  const entityMap = entities.reduce((prev, entity) => {
    const img = entity.imageFront;

    return {
      ...prev,
      [entity._id]: "https://dark-2.herokuapp.com/img/products/" + img,
    };
  }, {});

  return {
    ...state,
    imageFront: { ...state.byId, ...entityMap },
  };
};

export const addImgCover = (state: ProductsState, entities: Product[]) => {
  if (entities.length === 0) {
    return state;
  }

  const entityMap = entities.reduce((prev, entity) => {
    const img = entity.imageCover;

    return {
      ...prev,
      [entity._id]: "https://dark-2.herokuapp.com/img/products/" + img,
    };
  }, {});

  return {
    ...state,

    imageCover: { ...state.imageCover, ...entityMap },
  };
};

export const addImg1 = (state: ProductsState, entities: Product[]) => {
  if (entities.length === 0) {
    return state;
  }

  const entityMap = entities.reduce((prev, entity) => {
    const img = entity.images[0];

    return {
      ...prev,
      [entity._id]: "https://dark-2.herokuapp.com/img/products/" + img,
    };
  }, {});

  return {
    ...state,

    image1: { ...state.image1, ...entityMap },
  };
};

export const addImg2 = (state: ProductsState, entities: Product[]) => {
  if (entities.length === 0) {
    return state;
  }

  const entityMap = entities.reduce((prev, entity) => {
    const img = entity.images[1];
    return {
      ...prev,
      [entity._id]: "https://dark-2.herokuapp.com/img/products/" + img,
    };
  }, {});

  return {
    ...state,

    image2: { ...state.image2, ...entityMap },
  };
};

export const addImg3 = (state: ProductsState, entities: Product[]) => {
  if (entities.length === 0) {
    return state;
  }

  const entityMap = entities.reduce((prev, entity) => {
    const img = entity.images[2];
    return {
      ...prev,
      [entity._id]: "https://dark-2.herokuapp.com/img/products/" + img,
    };
  }, {});

  return {
    ...state,

    image3: { ...state.image3, ...entityMap },
  };
};
