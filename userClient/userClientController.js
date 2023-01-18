const userClientService = require("./userClientService");
const status = require("../common/indexOfCommon");
const csvtojson = require("csvtojson")
const path = require("path");
const fs = require("fs");
var vCard = require('vCard');
var card = new vCard();

//  CSV Upload
exports.csvUpload = async (req, res) => {
    try {
        const document = path.join(__dirname, `../temp/${req.file.originalname}`)
        csvtojson()
            .fromFile(document)
            .then(async csvData => {
                csvData.forEach((obj) => {
                    obj['user'] = '63bbb595682b2f69b0cf2989';
                });
                fs.unlink(document, (err) => {
                    if (err) throw err;
                })
                console.log(`Temp File ${document} is deleted`);
                const csv = await userClientService.csvUpload(csvData);
                return status.success(res, csv);
            })
    } catch (error) {
        return status.serverError(res,error);
    }
};

//  vCard contact add
exports.vCardContact = async (req, res) => {
    try {
        const document = path.join(__dirname, `../temp/${req.file.originalname}`);
        console.log('document: ', document);
        card.readFile(document, async (err, json) => {

            let vcfObject = []
            for (let i = 0; i < json.length; i++) {
                let array = {}
                const element = json[i];
                array.firstName = element.FN;

                if (element.TEL.value || element.TEL) {
                    array.contactNumber = element.TEL.value || element.TEL;
                    array.user = '63bbb595682b2f69b0cf2989';  // pass user id here
                    array.category = req.query.category;
                    array.tags = req.query.tags;
                }
                console.log('array: ', array);
                vcfObject.push(array)
            }
            const vcf = await userClientService.vcfUpload(vcfObject);
            return status.success(res, vcf);
        });
    } catch (error) {
        return status.serverError(res,error);
    }
}

//  Find Contact
exports.findContact = async (req, res) => {
    try {
        const id = req.body.id
        const uploadedCsv = await userClientService.findContact(id);
        return status.success(res, uploadedCsv);
    } catch (error) {
        return status.serverError(res,error);
    }
};
