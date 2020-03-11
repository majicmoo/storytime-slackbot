export const validate = (json: any) => {
  console.log(json);
  validateString(json.title);
  validateArray(json.nodes);
  validateArray(json.options);

  json.nodes.forEach(validateNode);
  json.options.forEach(validateOption);
};

const validateNode = (node: any) => {
  if (node === undefined || node === null) {
    throw new Error("Missing node");
  }

  validateString(node.id);
  validateString(node.statement);

  if (node.type !== "Normal" && node.type !== "Win" && node.type !== "Death") {
    throw new Error("bad node type");
  }

  validateArray(node.optionIds);

  node.optionIds.forEach(validateString);
};

const validateOption = (option: any) => {
  validateString(option.id);
  validateString(option.item);
  validateStringOrUndefined(option.tasteId);
  validateStringOrUndefined(option.touchId);
  validateStringOrUndefined(option.smellId);
  validateStringOrUndefined(option.lookId);
  validateStringOrUndefined(option.listenId);
};

const validateStringOrUndefined = (thing: any) => {
  if (thing === undefined) {
    return;
  }
  validateString(thing);
};
const validateString = (thing: any) => {
  if (typeof thing !== "string") {
    throw new Error("not a string");
  }
};
const validateArray = (thing: any) => {
  if (!Array.isArray(thing)) {
    throw new Error("not an array");
  }
};
