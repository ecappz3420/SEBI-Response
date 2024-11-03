const fetchRecords = async (reportName, criteria) => {
    const config = {
        appName: "cyber-security",
        reportName: reportName,
        criteria: criteria
    }
    try {
        await ZOHO.CREATOR.init();
        const records = await ZOHO.CREATOR.API.getAllRecords(config);
        return records.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export default fetchRecords