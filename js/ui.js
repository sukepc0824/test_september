$(function () {

    $(".tabs-container button").on("click", function () {
        $(".tabs-container button").removeClass("selection")
        $(this).addClass("selection")
    })

    $(document).click(function (event) {
        if (!$(event.target).closest('.content').length) {
            $(".small-box").removeClass("selection")
        }
    })

    $(".sortable").sortable({
        handle: '.drag-hundle'
    })

    $("button.save").on("click", function () {
        console.log(getData())
    })

    function getData() {
        let large_data;
        let small_data = []
        let data;
        $(".content").each(function () {
            large_data = {
                html: $(this).find("#editor .ql-editor").html(),
            }
            $(".small-box").each(function () {
                small_data.push({
                    html: $(this).find(".simple-editor .ql-editor").html(),
                    score: $(this).find("input.score .ql-editor").val(),
                    category: $(this).find("select").val(),
                    answer: {
                        delta: "",
                        html: $(this).find(".formula-editor").html()
                    }
                })
            })
            data.push({
                title: $(this).data("title"),
                large_data,small_data
            })
        })

        return data
    }

    class Small_question {
        constructor(small_question_data, index) {
            this.data = small_question_data
            this.index = index
        }
        create() {
            let $small = $(
                `
                <li>
                    <div class="small-box">
                        <div class="editor-container">
                            <div class="outline" style="display: flex; gap:4px;">
                                <span>${`(${String(this.index + 1)})`}</span>
                                <span>${this.data.html}</span>
                            </div>
                            <div class="detail">
                                <div class="topbar">
                                    <div class="small-number">${`(${String(this.index + 1)})`}</div>
                                    <div class="input">
                                        <input type="number" class="textbox score" placeholder="得点" value="${this.data.score}">
                                        <label class="selectbox">
                                            <select>
                                                <option>短文記述</option>
                                                <option>長文記述</option>
                                                <hr/>
                                                <option>選択式 - カタカナ</option>
                                                <option>選択式 - 数字</option>
                                                <option>選択式 - アルファベット</option>
                                            </select>
                                        </label>
                                    </div>
                                </div>
                                <div class="editor">
                                    <div class="textarea">
                                        <div class="simple-editor">${this.data.html}</div>
                                    </div>
                                    <div class="answer">
                                        <div class="formula-editor">${this.data.answer.html}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="drag-hundle">
                            <span class="material-symbols-outlined">
                                drag_indicator
                            </span>
                        </div>
                    </div>
                </li>
                `
            ).appendTo(".small-container ul")

        }
    }

    let editor_data = [{
        title:"",
        large_question: {
            html: ""
        },
        small_question: [
            {
                html: `          <p>Hello World!</p>
                    <p>Some initial <strong>bold</strong> text</p>
                    <p><br /></p>`,
                score: "4",
                category: "",
                answer: {
                    delta: "",
                    html: "2"
                }
            },
            {
                html: `          <p>Hello World!</p>
                    <p>Some initial <strong>bold</strong> text</p>
                    <p><br /></p>`,
                score: "4",
                category: "",
                answer: {
                    delta: "",
                    html: "2"
                }
            }
        ]
    }]

    editor_data.forEach(function (value) {
        value.small_question.forEach(function (v, i) {
            console.log(i)
            new Small_question(v, i).create()
        })
    })

    $(".sortable").on("click", ".small-box", function () {
        $(".small-box").removeClass("selection")
        $(this).addClass("selection")
    })


})