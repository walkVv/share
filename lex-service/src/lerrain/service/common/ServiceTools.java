package lerrain.service.common;

import com.alibaba.fastjson.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;

import java.util.HashMap;
import java.util.Map;

public class ServiceTools
{
    @Value("${sys.code:null}")
    String serviceCode;

    @Autowired
    ServiceMgr serviceMgr;

    Map<String, long[]> map = new HashMap<>();

    public synchronized Long nextId(String code)
    {
        long[] v = map.get(code);

        if (v == null)
        {
            v = reqId(code, new long[2]);
            map.put(code, v);
        }
        else
        {
            v[0]++;

            if (v[0] > v[1])
                reqId(code, v);
        }

        return v[0];
    }

    private long[] reqId(String code, long[] r)
    {
        String[] res = serviceMgr.reqStr("tools", "id/req", code).split(",");

        r[0] = Long.parseLong(res[0]);
        r[1] = Long.parseLong(res[1]);

        return r;
    }

    public JSONObject success(Object val)
    {
        JSONObject res = new JSONObject();
        res.put("result", "success");
        res.put("content", val);

        return res;
    }

    public JSONObject fail(Object val)
    {
        JSONObject res = new JSONObject();
        res.put("result", "fail");
        res.put("content", val);

        return res;
    }

    /**
     * synchronized对controller的每个方法来加锁效率比较高，并不需要对这个方法加锁，这里是简单化处理
     * @param param
     */
    public synchronized void idempotent(JSONObject param)
    {
        String key = param.getString("idempotent");
        if (key == null)
            throw new RuntimeException("no idempotent key");

        JSONObject req = new JSONObject();
        req.put("service", serviceCode);
        req.put("key", "idempotent/" + key);

        String res = (String)serviceMgr.reqVal("cache", "load.json", req);
        if (res != null)
            throw new RuntimeException("重复的请求");

        req.put("value", "Y");
        req.put("timeout", 3600000L * 24 * 30); //30天内幂等

        serviceMgr.req("cache", "save.json", req);
    }
}
