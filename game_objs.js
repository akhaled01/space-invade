export default class Game_Object {
    /**
     * 
     * @param {?CanvasRenderingContext2D} ctx
     * @param {!number} pos_x
     * @param {!number} pos_y 
     * @param {!number} width
     * @param {!number} height
     * @param {?HTMLImageElement} image
     */
    constructor(ctx, pos_x, pos_y, width, height, image = null) {
        this.ctx = ctx;
        this.pos_x = pos_x;
        this.pos_y = pos_y;
        this.width = width;
        this.height = height;
        this.image = image;
    }
    // /**
    //  *
    //  * @param {Game_Object} o2 the object to check collision agains
    //  * @returns {Game_Object}
    //  */
    // calculateCollision(o2) {
    // }

    /**
     * @param {HTMLImageElement} img
     * @param {number} sX
     * @param {number} sY
     * @param {number} sW
     * @param {number} sH
     * @param {number} dX
     * @param {number} dY
     * @param {number} dW
     * @param {number} dH
     */
    drawDisc(img, sX, sY, sW, sH, dX, dY, dW, dH) {
        // @ts-ignore
        this.ctx.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH);
    };
}