export class Circle {
    constructor(x, y, radius, color, countryCode) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.countryCode = countryCode;
        this.isColliding = false;
    }

    draw(context) {
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        context.fillStyle = this.color;
        context.fill();
        context.closePath();
    }

    updatePosition(dx, dy) {
        this.x += dx;
        this.y += dy;
    }

    checkCollision(otherCircle) {
        const dx = this.x - otherCircle.x;
        const dy = this.y - otherCircle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        return distance < this.radius + otherCircle.radius;
    }
}