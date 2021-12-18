class DOMHelper {
  static move (elem, coords){
    elem.style.top = (coords.y - (elem.clientHeight / 2)) + "px";
    elem.style.left = (coords.x - (elem.clientWidth / 2)) + "px";
  }
}

class DragList {
  constructor(list_selector, items_selector = "li") {
    this.list = document.querySelector(list_selector);
    this.items = this.list.querySelectorAll(items_selector);

    this.handleDragStat = this.handleDragStart.bind(this);
    this.handleDrag = this.handleDrag.bind(this);
    this.handleDragEnd = this.handleDragEnd.bind(this);

    this.canvas = document.createElement("canvas");

    this.bindEvents();
  }

  bindEvents() {
    this.items.forEach(item => {
      item.addEventListener("dragstart", this.handleDragStart);
      item.addEventListener("drag", this.handleDrag);
      item.addEventListener("dragend", this.handleDragEnd);
    })
  }

  handleDragStart(event) {
    let img = new Image ();
    let elem = event.currentTarget;
    img.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=';
    event.dataTransfer.setDragImage(img,0,0);
    elem.classList.add("dragging");
  }

  handleDrag(event) {
    DOMHelper.move(event.currentTarget,{x: event.clientX, y: event.clientY});
  }

  handleDragEnd(event) {
    let elem = event.currentTarget;
    elem.style.top="";
    elem.style.left="";
    elem.classList.remove("dragging");
  }
}

(function () {
  new DragList("ul");
})();
