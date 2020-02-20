module.exports.gerarPaginasMusicaDocx = (docx, titulo, cifra) => {
    
    if (typeof cifra === 'undefined') {
        return
    }

    // titulo
    let pObj = docx.createP({align: 'center'});
    pObj.addText(titulo, {
        font_face: 'Trebuchet MS', 
        font_size: '40', 
        bold: true, 
        underline: true,
        color: '000000', 
        
    });

    // cifra
    docx.createP();
    pObj = docx.createP();
    pObj.addText(cifra, {
        font_face: 'Arial', 
        font_size: '17'
    });
    
    docx.putPageBreak()
}

module.exports.getdocx = async (getMydocx, filename) => {
    const officegen = require('officegen')
    const fs = require('fs')
    
    // Create an empty PowerPoint object:
    let docx = officegen('docx')

    docx.options.pageMargins = {
        // top: 1800,
        // right: 1440,
        // bottom: 1800,
        // left: 1440
        top: 500,
        right: 500,
        bottom: 500,
        left: 500
      }

    // Let's add a title slide:
    
    await getMydocx(docx)
    
    let out = fs.createWriteStream(filename)
    
    out.on('error', function(err) {
      console.log(err)
    })
    
    // Officegen calling this function after finishing to generate the docx document:
    docx.on('finalize', function(written) {
        console.log(
            'Finish to create a Microsoft PowerPoint document.'
        )
    })
    
    // Officegen calling this function to report errors:
    docx.on('error', function(err) {
        console.log(err)
    })
    
    // Async call to generate the output file:
    docx.generate(out)
}

module.exports.getpptx = async (getMyPptx, filename) => {
    const officegen = require('officegen')
    const fs = require('fs')
    
    // Create an empty PowerPoint object:
    let pptx = officegen('pptx')
    
    // Let's add a title slide:
    
    await getMyPptx(pptx)
    
    let out = fs.createWriteStream(filename)
    
    out.on('error', function(err) {
      console.log(err)
    })
    
    // Officegen calling this function after finishing to generate the pptx document:
    pptx.on('finalize', function(written) {
        console.log(
            'Finish to create a Microsoft PowerPoint document.'
        )
    })
    
    // Officegen calling this function to report errors:
    pptx.on('error', function(err) {
        console.log(err)
    })
    
    // Async call to generate the output file:
    pptx.generate(out)
}

module.exports.getFontByLenght = lenght => {
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

module.exports.generateSlideCantoPptx = (pptx, text) => {

    text = text.trim();
    var numChar = text.length
    if(numChar == 0){
        // continue loop linha vazia
        return 
    }

    if(text.startsWith('$')){
        text = text.substring(1, numChar)
        txtColor = 'DB4B5E'
    } else {
        txtColor = '000000'
    }

    tamFonte = this.getFontByLenght(numChar)

    slide = pptx.makeNewSlide();
    
    slide.addText([{
        text: text, options: {
            font_size: tamFonte,
            font_face: 'Arial',
            color: txtColor
        }
    }], {
        x: 'c',
        y: 'c',
        cx: '90%',
        cy: '90%'
    });
}

module.exports.generateSlideTituloPptx = (pptx, text) => {

    text = text.trim();

    slide = pptx.makeNewSlide();
    
    slide.addText([{
        text: text, options: {
            font_size: 72,
            font_face: 'Arial',
            color: '3F8A70',
            bold: true
        }
    }], {
        x: 'c',
        y: 'c',
        cx: '100%',
        cy: '30%',
        align: 'center'
    });
}

module.exports.gerarSlideMusicaPptx = (pptx, musica) => {
    
    apr = musica.apresentacao;

    
    if (typeof apr === 'undefined') {
        return
    }

    this.generateSlideTituloPptx(pptx, musica.tituloSlide);

    apr.split('\n').forEach((line) => {

        // Let's create a new slide:
        this.generateSlideCantoPptx(pptx, line);
    })
}

