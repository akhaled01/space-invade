export class Game_Object_Image {
    /**
     * @param {!number} width
     * @param {!number} height
     * @param {!string} image
     */
    constructor(width, height, image) {
        this.width = width
        this.height = height
        this.image = new Image();
        this.image.src = image;
    }
}
export class Game_Object {
    /**
     * 
     * @param {?CanvasRenderingContext2D} ctx
     * @param {!number} pos_x
     * @param {!number} pos_y 
     * @param {!number} width
     * @param {!number} height
     * @param {string} image
     */
    constructor(ctx, pos_x, pos_y, width, height, image = "") {
        this.ctx = ctx;
        this.pos_x = pos_x;
        this.pos_y = pos_y;
        this.object_image = new Game_Object_Image(width, height, image)
    }
    // /**
    //  *
    //  * @param {Game_Object} o2 the object to check collision agains
    //  * @returns {Game_Object}
    //  */
    // calculateCollision(o2) {
    // }

    /**
     * @param {!number} sX
     * @param {!number} sY
     * @param {!number} sW
     * @param {!number} sH
     * @param {!number} dW
     * @param {!number} dH
     */
    drawObject(sX, sY, sW, sH, dW, dH) {
        // @ts-ignore
        this.ctx.drawImage(this.object_image.image, sX, sY, sW, sH, this.pos_x, this.pos_y, dW, dH);
    };
}