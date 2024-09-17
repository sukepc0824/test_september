$(function () {
    var toolbarOptions = [
        ['bold', 'italic', 'underline'],        // toggled buttons

        [{ 'list': 'ordered' }, { 'list': 'bullet' }],

        [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown

        [{ 'align': [] }],
        ['image', "formula"]
    ];


    var quill = new Quill('#editor', {
        theme: 'snow',
        modules: {
            toolbar: {
                container: toolbarOptions,
                handlers: {
                    image: imageHandler
                }
            },
            formula: true,
        },
    });

    const enableMathQuillFormulaAuthoring = mathquill4quill();
    enableMathQuillFormulaAuthoring(quill, { operators: [["\\sqrt{x}", "\\nthroot"], ["\\cfrac{x}{y}", "\\cfrac"]] })


    function imageHandler() {
        var range = this.quill.getSelection();
        var value = prompt('URLから画像を挿入');
        if (value) {
            this.quill.insertEmbed(range.index, 'image', value, Quill.sources.USER);
        }
    }

    //console.log(quill.getContents())

    $(".simple-editor").each(function (i) {
        let quill = new Quill($(this)[0], {
            theme: "snow",
            modules: {
                toolbar: {
                    container: [['bold', 'italic', 'underline'], [{ 'list': 'ordered' }, "formula"]],
                    handlers: {
                        image: imageHandler
                    }
                },
                formula: true,
            },
            placeholder:
                "小問...",
        })
        enableMathQuillFormulaAuthoring(quill, { operators: [["\\sqrt{x}", "\\nthroot"], ["\\frac{x}{y}", "\\frac"]] })
    })
    $(".formula-editor").each(function (i) {
        let quill = new Quill($(this)[0], {
            theme: "snow",
            modules: {
                toolbar: {
                    container: ["formula"],
                    handlers: {
                        image: imageHandler
                    }
                },
                formula: true,
            },
            placeholder:
                "模範解答...",
        })
        enableMathQuillFormulaAuthoring(quill, { operators: [["\\sqrt{x}", "\\nthroot"], ["\\frac{x}{y}", "\\frac"]] })
    })
}) 