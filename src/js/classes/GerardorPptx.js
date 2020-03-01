import PptxGenJS from "pptxgenjs";

const DEFAULT_TITLE_COLOR = "3F8A70";
const DEFAULT_REFRAO_COLOR = "DB4B5E";
const DEFAULT_NORMAL_COLOR = "000000";
const DEFAULT_BACKGROUND_COLOR = "ffffff";
const DEFAULT_FONT_SIZE = "72";

export default class GeradorPptx {

  constructor(musicas, titleColor = DEFAULT_TITLE_COLOR, refraoColor = DEFAULT_REFRAO_COLOR, normalColor = DEFAULT_NORMAL_COLOR, backgroundColor = DEFAULT_BACKGROUND_COLOR) {
    this.musicas = musicas;
    this.titleColor = titleColor;
    this.refraoColor = refraoColor;
    this.normalColor = normalColor;
    this.backgroundColor = backgroundColor;
  }

  getFontByLenght = lenght => {
    if (lenght < 71) {
      return 72;
    } else if (lenght < 80) {
      return 66;
    } else if (lenght < 103) {
      return 60;
    } else if (lenght < 115) {
      return 54;
    } else if (lenght < 155) {
      return 48;
    } else if (lenght < 193) {
      return 44;
    } else {
      return 40;
    }
  }

  generateSlideCantoPptx = (pres, text) => {
    text = text.trim();
    let numChar = text.length
    let txtColor;
    if (numChar === 0) {
      // continue loop linha vazia
      return
    }

    if (text.startsWith('$')) {
      text = text.substring(1, numChar)
      txtColor = this.refraoColor;
    } else {
      txtColor = this.normalColor;
    }

    let tamFonte = this.getFontByLenght(numChar)

    this.addSlide(text, pres, txtColor, tamFonte);
  }

  addSlide = (text, pres, color, fontSize = DEFAULT_FONT_SIZE, background = this.backgroundColor) => {

    let slide = pres.addSlide();

    let textboxOpts = { x: 0, y: 0, w: "100%", h: "100%", color: color, fill: background, align: "center", fontSize: fontSize };
    slide.addText(text, textboxOpts);

  }

  gerarPptX = () => {    

    // 1. Create a new Presentation
    let pres = new PptxGenJS();
    this.musicas.forEach(m => {

      this.addSlide(m.momento, pres, this.titleColor);

      m.apresentacao.split('\n').forEach((line) => {

        this.generateSlideCantoPptx(pres, line)
      })

    })

    // 4. Save the Presentation
    pres.writeFile("Sample Presentation.pptx");

  }

}