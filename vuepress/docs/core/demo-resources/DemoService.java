package org.entando.demo.services;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.Calendar;
import java.util.List;

@Service
public class DemoService {


    private static String graphJson = "{ min: 0, max:100, \"value\": 50}";

    private static List<Integer> orders = Arrays.asList(800, 500, 650, 700, 500, 450, 800, 575, 485, 850, 700, 770,
            500, 575, 700, 765, 300, 850, 850, 999, 475, 999, 550, 780,
            650, 760, 850, 850, 175, 550, 999);

    private static List<Integer> payments = Arrays.asList(7, 5, 3, 8, 9, 7, 4, 3, 6, 7, 8, 6,
            3, 4, 11, 7, 7, 11, 11, 6, 6, 7, 10, 13,
            7, 8, 8, 7, 5, 7, 25);

    private static int[] tasksCompleted = {0, 30, 25};
    private static int[] firstResponse = {144, 198, 195, 95};
    private static int[] resolution = {144, 198, 191, 88};
    private static int[] satisfaction = {144, 198, 198, 100};

    private static String leaderboardJson = "{\"leaderboard\":[" +
            "{\"rank\": 1, \"name\": \"Meg Foley\", \"value\": 200}," +
            "{\"rank\": 2, \"name\": \"Eric Marts\", \"value\": 188}," +
            "{\"rank\": 3, \"name\": \"Walter Ambu\", \"value\": 175}" +
            "]}";
    private static SimpleDateFormat fmt = new SimpleDateFormat("dd/MM/yyyy");

    public JSONObject getDemoGraphJson(String key){

        if(key.equals("tasks")) {
            return getDemoGraphJson(tasksCompleted[0], tasksCompleted[1], tasksCompleted[2], tasksCompleted[3]);
        }else if (key.equals("firstResponse")){
            return getDemoGraphJson(firstResponse[0], firstResponse[1], firstResponse[2], firstResponse[3]);
        }else if(key.equals("resolution")){
            return getDemoGraphJson(resolution[0], resolution[1], resolution[2], resolution[3]);
        }else if(key.equals("satisfaction")){
            return getDemoGraphJson(satisfaction[0], satisfaction[1], satisfaction[2], satisfaction[3]);
        }

        return getDemoGraphJson(0, 100, 50, 50);
    }
    public JSONObject getDemoGraphJson(int min, int max, int value, int percentage){

        JSONObject json = new JSONObject(graphJson);
        json.put("min", min);
        json.put("max", max);
        json.put("value", value);
        json.put("percentage", percentage);

        return json;
    }

    public JSONObject getLeaderboardJson(){
        return new JSONObject(leaderboardJson);
    }

    public JSONObject getTimeSeriesJson() {
        JSONObject timeseries = new JSONObject();

        JSONArray labels = new JSONArray();
        JSONArray priceData = new JSONArray();
        JSONArray orderData = new JSONArray();

        Calendar cal = Calendar.getInstance();
        cal.set(Calendar.MONTH, 0);
        cal.set(Calendar.DAY_OF_MONTH, 1);

        for(int i =0;i<31;i++){
            labels.put(fmt.format(cal.getTime()));
            orderData.put(orders.get(i));
            priceData.put(payments.get(i));
            cal.add(Calendar.DAY_OF_MONTH, 1);
        }

        JSONArray datasets = new JSONArray();
        JSONObject dataPrice = new JSONObject();
        JSONObject dataOrder = new JSONObject();

        dataPrice.put("data", priceData);
        dataOrder.put("data", orderData);

        datasets.put(dataPrice);
        datasets.put(dataOrder);

        JSONObject mainData = new JSONObject();
        mainData.put("datasets", datasets);
        mainData.put("labels", labels);
        timeseries.put("data ", mainData);
        return timeseries;
    }
}
