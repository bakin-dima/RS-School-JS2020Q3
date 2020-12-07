export default (categories, statistic) => {
  categories.forEach((category) => {
    const elements = category.content;

    elements.forEach((element) => {
      const statisticItem = {
        categoryName: category.title,
        trainCount: 0,
        correctCount: 0,
        mistakesCount: 0,
        en: element.en,
        ru: element.ru,
        coef: 0,
      };
      statistic.push(statisticItem);
    });
  });
};
