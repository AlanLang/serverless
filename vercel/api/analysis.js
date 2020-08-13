const jb = require("nodejieba");

module.exports = (req, res) => {
    try {
        //֧�ֵ�����
        let langs = ["zh-cn"], lang = req.url.split('/')[2];

        //Ĭ������
        if (langs.indexOf(lang) == -1) {
            lang = langs[0];
        }

        let pars = req.method == "POST" ? req.body : req.query;
        let ctype = pars.ctype, content = pars.content;

        if (content != null) {
            content = decodeURIComponent(content);
            switch (lang) {
                case "zh-cn":
                    {
                        switch (ctype * 1) {
                            //�ؼ���
                            case 1:
                                {
                                    //ȡ���ٸ���
                                    let topn = parseInt(pars.topn);
                                    topn = isNaN(topn) ? 10 : topn;

                                    res.send({
                                        code: 200,
                                        data: jb.extract(content, topn)
                                    })
                                }
                                break;
                            //�ִ�
                            default:
                                res.send({
                                    code: 200,
                                    data: jb.cut(content)
                                })
                        }
                    }
                    break;
            }
        } else {
            throw new Error("content is empty");
        }
    } catch (e) {
        res.json({
            code: -1,
            msg: e + ""
        });
    }
}