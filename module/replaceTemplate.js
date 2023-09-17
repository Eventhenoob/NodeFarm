module.exports = (templateCard, el) => {
  let updatedTemplate = templateCard;

  for (item in el) {
    updatedTemplate = updatedTemplate.replaceAll(
      `{%${item.toUpperCase()}%}`,
      el[item]
    );
  }
  if (!el.isOrganic)
    updatedTemplate = updatedTemplate.replaceAll(
      "{%NOT_ORGANIC%}",
      "not_organic"
    );

  return updatedTemplate;
};
