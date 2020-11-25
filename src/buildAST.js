import _ from 'lodash';

const buildAST = (data1, data2) => {
  const keys1 = _.keys(data1);
  const keys2 = _.keys(data2);
  const keys = _.sortBy(_.union(keys1, keys2));

  const tree = keys.map((key) => {
    const oldValue = data1[key];
    const newValue = data2[key];
    if (!keys1.includes(key)) {
      return { name: key, type: 'added', newValue };
    }
    if (!keys2.includes(key)) {
      return { name: key, type: 'deleted', oldValue };
    }
    if (oldValue === newValue) {
      return { name: key, type: 'unchanged', oldValue };
    }
    if (_.isObject(data1[key]) && _.isObject(data2[key])) {
      return { name: key, type: 'nested', children: buildAST(oldValue, newValue) };
    }
    return {
      name: key, type: 'changed', oldValue, newValue,
    };
  });
  return tree;
};

export default (data1, data2) => ({
  type: 'root',
  children: buildAST(data1, data2),
});
