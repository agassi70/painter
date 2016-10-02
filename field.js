import { Circle } from './circle';

class Field {
  constructor(elem, size = 40) {
    this.elem = elem;
    this.size = size;
    this.circles = [];
    for (let i = 1; i <= 10; i++) {
      const x = size * i;
      const y = size * i;
      this.circles.push(new Circle({x, y, size, field: elem}));
    }

    this.elem.addEventListener('dblclick', event => {
      if (event.target === this.elem) {
        const check = this.circles.every(circle => this.countDistance(circle, { x: event.pageX, y: event.pageY }) > size);
        if (check) this.circles.push(new Circle({ x: event.pageX, y: event.pageY, size, field: elem }));
        return;
      }
      const circleForDelete = this.circles.find(current => current.node === event.target);
      if (circleForDelete) this.deleteCircle(circleForDelete);
    });

    this.elem.addEventListener('movement', event => {
      let movedCircle = this.circles.find(circle => circle.x === event.detail.x && circle.y === event.detail.y);
      if (!movedCircle) return;

      let sibling = this.checkSiblings(movedCircle);
      while (sibling) {
        movedCircle.moveable = false;
        const mergedCircle = this.mergeCircles(sibling, movedCircle);
        this.deleteCircle(sibling);
        this.deleteCircle(movedCircle);
        sibling = this.checkSiblings(mergedCircle);
        movedCircle = mergedCircle;
      }
    });
  }

  checkSiblings(circle) {
    for (const current of this.circles) {
      if (current === circle) continue;
      const distance = this.countDistance(current, circle);
      if (distance < this.size / 4) return current;
    }
    return null;
  }

  countDistance({ x: x1, y: y1 }, { x: x2, y: y2 }) {
    const side1 = Math.round(x1 - x2);
    const side2 = Math.round(y1 - y2);
    return Math.round(Math.sqrt(side1 * side1 + side2 * side2));
  }

  mergeCircles({ x: x1, y: y1, color: color1 }, { x: x2, y: y2, color: color2 }) {
    const middleX = Math.round((x1 + x2) / 2);
    const middleY = Math.round((y1 + y2) / 2);
    const c1 = parseInt(color1.slice(1), 16);
    const c2 = parseInt(color2.slice(1), 16);
    const middleColor = `#${Math.floor((c1 + c2) / 2).toString(16)}`;
    const mergedCircle = new Circle({ x: middleX, y: middleY, color: middleColor, size: this.size, field: this.elem });
    this.circles.push(mergedCircle);
    return mergedCircle;
  }

  deleteCircle(circle) {
    circle.node.remove();
    const idx = this.circles.findIndex(current => current === circle);
    this.circles.splice(idx, 1);
  }
}

export { Field };
