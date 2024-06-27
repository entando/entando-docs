package org.entando.training.controllers;

import org.entando.training.services.DemoService;
import org.entando.entando.web.common.annotation.RestAccessControl;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.Map;

@RestController
public class DemoController {


    @Autowired
    DemoService demoService;

    private final Logger logger = LoggerFactory.getLogger(getClass());

    @RestAccessControl(permission = "")
    @RequestMapping(value = "/fsi/leaderboard", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public Map<String, Object> fetchLeaderboard() throws IOException {
        JSONObject resp = null;
        try {
            resp = demoService.getLeaderboardJson();
        }catch(Exception e) {
            logger.error("Failed to get leaderboard ", e);
        }

        return resp.toMap();
    }

    @RestAccessControl(permission = "")
    @RequestMapping(value = "/fsi/graphData/{type}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public Map<String, Object> fetchGraphData(@PathVariable String type) throws IOException {
        return demoService.getDemoGraphJson(type).toMap();
    }

    @RestAccessControl(permission = "")
    @RequestMapping(value = "/fsi/orderPaymentData", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public Map<String, Object> fetchOrderPaymentData() throws IOException {
        return demoService.getTimeSeriesJson().toMap();
    }

}
