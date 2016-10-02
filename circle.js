class Circle {
  constructor(options) {
    Object.assign(this, options);
    if (!this.color) {
      const randomColor = Math.floor(Math.random() * 0xffffff);
      this.color = `#${randomColor.toString(16)}`;
    }
    if (!this.size) this.size = 40;
    this.moveable = false;
    this.node = document.createElement('div');
    this.node.classList.add('circle');
    this.node.style.width = this.node.style.height = `${this.size}px`;
    this.node.style.top = `${this.y - this.size / 2}px`;
    this.node.style.left = `${this.x - this.size / 2}px`;
    this.node.style.backgroundColor = this.color;
    this.field.appendChild(this.node);

    this.node.addEventListener('mousedown', () => {
      this.moveable = true;
      this.node.style.zIndex = 10;
    });
    this.field.addEventListener('mouseup', () => {
      this.moveable = false;
      this.node.style.zIndex = 'auto';
    });
    this.node.addEventListener('mousemove', event => {
      if (!this.moveable) return;
      this.node.style.left = `${event.pageX - this.size / 2}px`;
      this.node.style.top = `${event.pageY - this.size / 2}px`;
      this.x = event.pageX;
      this.y = event.pageY;
      const eventMove = new CustomEvent('movement', { bubbles: true,
        detail: Object.assign({}, this) });
      this.node.dispatchEvent(eventMove);
    });
  }
}

export { Circle };
