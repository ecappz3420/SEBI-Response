const fetchRecord = async (reportName, id) => {
    const config = {
        appName: "cyber-security",
        reportName: reportName,
        id: id
    }
    try {
        await ZOHO.CREATOR.init();
        const record = await ZOHO.CREATOR.API.getRecordById(config)
        return record.data;
    } catch (error) {
        console.log(error)
        throw error
    }
}
export default fetchRecord