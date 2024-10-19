
export const ReturnPRBadge = (
    membership,
    mrp,
    instance,
    prodcut,
    land,
    coparter
) => {
    if (membership == 1) {
        if (mrp !== instance) {
            return true;
        }
    }
    if (membership == 2) {
        if (mrp !== prodcut) {
            return true;
        }
    }
    if (membership == 3) {
        if (mrp !== land) {
            return true;
        }
    }
    if (membership == 4) {
        if (mrp !== coparter) {
            return true;
        }
    }
}

export const ReturnPR = (membership, mrp, instant, prodcut, land, coparter) => {
    return Math.round(((mrp - instant) / mrp) * 100);
    // if (membership == 1) {
    //   return Math.round(((mrp - instant) / mrp) * 100);
    // }
    // if (membership == 2) {
    //   return Math.round(((mrp - prodcut) / mrp) * 100);
    // }
    // if (membership == 3) {
    //   return Math.round(((mrp - land) / mrp) * 100);
    // }
    // if (membership == 4) {
    //   return Math.round(((mrp - coparter) / mrp) * 100);
    // }
  };

// export const ReturnPR = (membership, mrp, instance, prodcut, land, coparter) => {
//     if (membership == 1) {
//       return Math.round(((mrp - instance) / mrp) * 100);
//     }
//     if (membership == 2) {
//       return Math.round(((mrp - prodcut) / mrp) * 100);
//     }
//     if (membership == 3) {
//       return Math.round(((mrp - land) / mrp) * 100);
//     }
//     if (membership == 4) {
//       return Math.round(((mrp - coparter) / mrp) * 100);
//     }
//   };
