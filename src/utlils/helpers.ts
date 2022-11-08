type Indexed<T = any> = {
  [key in string]: T;
}

function merge(lhs: Indexed, rhs: Indexed): Indexed {
  for (const p in rhs) {
    if (!rhs.hasOwnProperty(p)) {
      // eslint-disable-next-line no-continue
      continue;
    }
    try {
      if (rhs[p].constructor === Object) {
        lhs[p] = merge(lhs[p] as Indexed, rhs[p] as Indexed);
      } else {
        lhs[p] = rhs[p];
      }
    } catch (e) {
      lhs[p] = rhs[p];
    }
  }

  return lhs;
}

export function set(object: Indexed | unknown, path: string, value: unknown): Indexed | unknown {
  if (typeof object !== 'object') {
    return object;
  }
  const res = path.split('.').reduceRight((acc, cur) => ({ [cur]: acc }), value);
  return merge(object as Indexed, res as Indexed);
}
