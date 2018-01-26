
class GameMaster {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        // 創一個 Render 自動判斷是否有 webGL
        this.renderer = PIXI.autoDetectRenderer(
            width,
            height,
            { transparent: false },
            false
        );
        // 創建一個 stage
        this.stage = new PIXI.Container();
        // 創建一個 loader 負責讀入圖片
        this.loader = new PIXI.loaders.Loader();
        // 將建立出來的畫布放到 html 的 DOM 上
        document.body.appendChild(this.renderer.view);
        this.renderer.render(this.stage);
        // 設定每次讀取完單個檔案後的 callback function
        this.loader.on('progress', this.loadProgressHandler, this);
        // 讀取所有圖片資料
        this.loadAssets();
        // 設定每次 update 時的 callback function
        requestAnimationFrame(this.update.bind(this));
    }

    // load 所有圖片的 function ，如果之後要多讀取圖片到 cache 裡的話可以先在這邊讀取進來
    loadAssets() {
        // 用百分比顯示目前讀取狀況
        this.progressText = new PIXI.Text("loading: " + (this.loader.progress | 0) + "%");
        this.progressText.style.fill = 0xFFFFFF;
        this.progressText.x = this.width / 2;
        this.progressText.y = this.height / 2;
        this.progressText.anchor.x = 0.5;
        this.progressText.anchor.y = 0.5;
        // 將 progress text 加入到 stage 中
        this.stage.addChild(this.progressText);
        // 將所有圖片的路徑加入等待讀取的 queue 中
        this.loader.add("fighter", "assets/fighter.png")
            .add("back", "assets/background.png")
            .add("bullet", "assets/bullet.png");
        // 開始讀取 queue 中所有路徑的圖片，並且在 load 完之後 callback function 執行 init function
        this.loader.load(this.init);
    }

    // load 時的 handler
    loadProgressHandler(loader, resource) {
        this.progressText.text = "loading: " + (loader.progress | 0) + "%";
        //this.renderer.render(this.stage);
        // console.log 顯示幕前讀取的資料
        console.log("loading: " + resource.url);
        console.log("progress: " + (loader.progress | 0) + "%");

    }

    update() {
        this.renderer.render(this.stage);
        requestAnimationFrame(this.update.bind(this));
    }

}

var gm = new GameMaster(800, 600);
