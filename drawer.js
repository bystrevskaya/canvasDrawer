const canvas = document.querySelector('#drawer');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const ctx = canvas.getContext('2d');

        ctx.strokeStyle = '#BADA55';
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';
        ctx.lineWidth = 5;

        let isDrawing = false;
        let lastX = 0;
        let lastY = 0;
        let hue = 0;
        let direction = -1

        function width(nowWidth, minWidth, maxWidth) {
            if (nowWidth == minWidth || nowWidth == maxWidth) direction = -direction;
            return nowWidth + direction;           
        }

        function draw(e) {
            if (!isDrawing) return;

            if (hue == 359) hue = 0 
            else hue++;

            ctx.lineWidth = width(ctx.lineWidth, 5, 50);

            ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;

            ctx.beginPath();
            ctx.moveTo(lastX, lastY);
            ctx.lineTo(e.offsetX, e.offsetY);
            ctx.stroke();

            [lastX, lastY] = [e.offsetX, e.offsetY];
        }

        function drawInit(e) {
            isDrawing = true;
            [lastX, lastY] = [e.offsetX, e.offsetY];
        }

        canvas.addEventListener('mousedown', drawInit);
        canvas.addEventListener('mousemove', draw);
        canvas.addEventListener('mouseup', () => isDrawing = false);
        canvas.addEventListener('mouseout', () => isDrawing = false);