const express = require('express');
const router = express.Router();
const axios = require('axios');

// const env = require('dotenv').config({ path: "../.env" });

const path = require('path');
const { log } = require('console');

const PORT = process.env.PORT || 8500;
const FASTAPI_URL1 = process.env.FASTAPI_URL1
const FASTAPI_URL2 = process.env.FASTAPI_URL2
const NODE_URL1 = process.env.NODE_URL1
const NODE_URL2 = process.env.NODE_URL2




router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});


// 검색을 눌렀을 시 이벤트 (키워드, 구어체 구분)
router.get('/search', async (req, res) => {
    const searchType = req.query.type;
    const searchWord = req.query.searchword;

    // 키워드 기반 검색
    if (searchType === 'keyword') {
        try {
            const response = await axios.get(`${NODE_URL1}/searchKeyword?type=${searchType}&searchword=${searchWord}`);
            res.render('search.ejs', response.data);
        } catch (error) {
            console.error(error);
            if (!res.headersSent) {
                res.status(500).send('Error fetching data');
            }
        }

    }
    // 구어체 기반 검색
    else if (searchType === 'sentence') {
        try {
            const response = await axios.get(`${NODE_URL2}/searchColl?type=${searchType}&searchword=${searchWord}`);
            res.render('search.ejs', response.data);
        } catch (error) {
            console.error(error);
            if (!res.headersSent) {
                res.status(500).send('Error fetching data');
            }
        }
    }
    // 오류 처리
    else {
        console.log('Invalid search type');
        res.render('index.html');
    }
});


// arixiv 데이터 가져오기
router.get('/getMeta', async (req, res) => {
    const { searchword } = req.query;

    try {
        const response = await axios.get(`${FASTAPI_URL}/getMeta`, {
            params: { searchword }
        });
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching data from FastAPI:', error);
        res.status(500).json({ resultCode: 500, message: "Failed to fetch data from FastAPI" });
    }
});

// wea 데이터 저장
router.post('/saveWea', async (req, res) => {
    try {
        const response = await axios.post(`${FASTAPI_URL}/saveWea`, req.body);
        res.json(response.data);
    } catch (error) {
        console.error('Error saving data to FastAPI:', error);
        res.status(500).json({ resultCode: 500, message: "Failed to save data to FastAPI" });
    }
});


// 키워드 기반 검색
router.get('/searchKeyword', async (req, res) => {
    const { searchword } = req.query;

    try {
        // 0차로 RDS에 데이터가 있는지 조회하기
        const selectRDSResponse = await axios.get(`${NODE_URL2}/selectRDS`, {
            params: { searchword }
        })
        const selectRDSData = selectRDSResponse.data;
        // console.log(selectRDSData)
        // 데이터가 없다면 저장하는 로직 실행
        if (selectRDSData.resultCode == 404) {

            // 1차로 getMeta를 통해서 데이터 가져오기
            const getMetaResponse = await axios.get(`${FASTAPI_URL1}/getMeta`, {
                params: { searchword }
            });
            const metaData = getMetaResponse.data;

            // 2차로 saveWea를 통해서 데이터 적재하기
            const saveWeaResponse = await axios.post(`${FASTAPI_URL1}/saveWea`, metaData);
            const saveWeaData = saveWeaResponse.data;

            // 3차로 rds에 저장하기
            let resKeyword = {
                "data": [
                    { "keyword": searchword }
                ]
            }

            const saveRdsResponse = await axios.post(`${NODE_URL2}/saveRDS`, resKeyword);
            const saveRdsData = saveRdsResponse.data;

        }

        // searchKeyword를 통해서 데이터 검색하기
        const searchKeywordResponse = await axios.get(`${FASTAPI_URL1}/searchKeyword`, {
            params: { searchword }
        });
        const searchKeywordData = searchKeywordResponse.data;
        // 결과 렌더링
        res.json(searchKeywordData);
        // res.json(searchKeywordData.data);
    } catch (error) {
        console.error('Error fetching data from FastAPI:', error);
        res.status(500).json({ resultCode: 500, message: "Failed to fetch data from FastAPI" });
    }
});




module.exports = router;