### 1.如何通过http的方式调用llm 大模型？

以deepseek为例子


YOUR_API_KEY 替换成真实的key


deepseek api 接口 url DEEPSEEK_BASE_URL=https://api.deepseek.com/v1


然后聊天接口走的是 OpenAI 兼容写法，请求路径是 chat/completions



deepseek-chat 通用聊天模型



curl -X POST "https://api.deepseek.com/v1/chat/completions" \

  -H "Authorization: Bearer YOUR_API_KEY" \

  -H "Content-Type: application/json" \

  -d '{

​    "model": "deepseek-chat",

​    "temperature": 0.7,

​    "messages": [

​      {"role": "system", "content": " 你是信息抽取助手。请从用户文本中提取地址、姓名、手机号。"

​        "严格只返回 JSON，不要解释，不要 markdown。"

​        'JSON 键必须是: {"address": "...", "name": "...", "phone": "..."}。'

​        "若某字段缺失请返回空字符串。},

​      {"role": "user", "content": "广东省深圳市南山区高新南七道20号国家工程实验室大楼 张文林 15976123893"}

​    ]

  }'



llm会返回对应的内容

INFO:httpx:HTTP Request: POST https://api.deepseek.com/v1/chat/completions "HTTP/1.1 200 OK"

INFO:app.main:[extract_contact] llm raw response={"id": "d17bb7aa-835f-439f-8cc6-c84a5f214af7", "object": "chat.completion", "created": 1772003188, "model": "deepseek-chat", "choices": [{"index": 0, "message": {"role": "assistant", "content": "{\n \"address\": \"广东省深圳市南山区高新南七道20号国家工程实验室大楼\",\n \"name\": \"张文林\",\n \"phone\": \"15976123893\"\n}"}, "logprobs": null, "finish_reason": "stop"}], "usage": {"prompt_tokens": 107, "completion_tokens": 40, "total_tokens": 147, "prompt_tokens_details": {"cached_tokens": 64}, "prompt_cache_hit_tokens": 64, "prompt_cache_miss_tokens": 43}, "system_fingerprint": "fp_eaab8d114b_prod0820_fp8_kvcache"}

```json
{
    "id": "d17bb7aa-835f-439f-8cc6-c84a5f214af7",
    "object": "chat.completion",
    "created": 1772003188,
    "model": "deepseek-chat",
    "choices": [
        {
            "index": 0,
            "message": {
                "role": "assistant",
                "content": "{\n \"address\": \"广东省深圳市南山区高新南七道20号国家工程实验室大楼\",\n \"name\": \"张文林\",\n \"phone\": \"15976123893\"\n}"
            },
            "logprobs": null,
            "finish_reason": "stop"
        }
    ],
    "usage": {
        "prompt_tokens": 107,
        "completion_tokens": 40,
        "total_tokens": 147,
        "prompt_tokens_details": {
            "cached_tokens": 64
        },
        "prompt_cache_hit_tokens": 64,
        "prompt_cache_miss_tokens": 43
    },
    "system_fingerprint": "fp_eaab8d114b_prod0820_fp8_kvcache"
}
```

INFO:app.main:[extract_contact] llm content={ "address": "广东省深圳市南山区高新南七道20号国家工程实验室大楼", "name": "张文林", "phone": "15976123893" }

INFO:     127.0.0.1:59952 - "POST /api/assistant/extract-contact HTTP/1.1" 200 OK





### 2.llm 调用mcp 服务 的具体通信数据



INFO:utils.dream_assistant_agent:[LLM] chat_stream mode=stadium message=查查深圳市的场馆有哪些

INFO:httpx:HTTP Request: POST https://api.deepseek.com/v1/chat/completions "HTTP/1.1 200 OK"

INFO:utils.dream_assistant_agent:[TOOL] query_user_stadiums city=深圳 area_id= resolved_area_id=4403 page=1 size=20

INFO:utils.dream_assistant_agent:[MCP->REQ] gateway=http://127.0.0.1:5235/gateway/mcp/user/mcp tool=getPKYDStadiumList args={"area_id": "4403", "page": "1", "size": "20"}

INFO:utils.dream_assistant_agent:[MCP->INIT] payload={"jsonrpc": "2.0", "id": 1, "method": "initialize", "params": {"protocolVersion": "2024-11-05", "capabilities": {}, "clientInfo": {"name": "dream-ai-backend", "version": "1.0"}}} status=200 session=bd93dc6d-e464-4fed-af64-e16d69eba4fb

INFO:utils.dream_assistant_agent:[MCP->CALL] payload={"jsonrpc": "2.0", "id": 2, "method": "tools/call", "params": {"name": "getPKYDStadiumList", "arguments": {"area_id": "4403", "page": "1", "size": "20"}}}

INFO:utils.dream_assistant_agent:[MCP<-RAW] tool=getPKYDStadiumList status=200 bytes=34452 body=event: message data: {"jsonrpc":"2.0","id":2,"result":{"content":[{"type":"text","text":"{\n \"code\": 200,\n \"message\": ,\n \"data\": {\n \"count\": 55,\n \"page\": 1,\n \"size\": 20,\n \"list\": \"[{\\\"address\\\":\\\"å¹¿ä¸çæ·±å³å¸åå±±åºç§åè·¯\\\",\\\"area_size\\\":\\\"\\\",\\\"c_time\\\":1767922449,\\\"charge_name\\\":\\\"\\\",\\\"charge_phone\\\":\\\"\\\",\\\"community_id\\\":0,\\\"contact_name\\\":\\\"\\\",\\\"contact_phone\\\":\\\"\\\",\\\"contain_count\\\":0,\\\"distance\\\":0,\\\"end_time\\\":2000,\\\"icon\\\":\\\"/HOST/images/member_avatar/20210428/cbb2aa51970aa3dcc9e9c78451b54f72.png\\\",\\\"images\\\":\\\"/HOST/images/20250722/4b721611c41dacfe1fd292a4359a6227.png,/HOST/images/20250722/7d4e7f2de29f00a820c9ef2e6bd03abd.png,/HOST/images/20250722/34822ac1b4401ddc1cf1095853c2edef.jpg,/HOST/images/20250722/4984e66656bca40a15361e2a13a298f6.jpg,/HOST/images/20250722/7a86f0759dee029a217a162ecca73460.jpg,/HOST/images/20250722/f2f68788e26142841edbdc2c5b82db94.jpg\\\",\\\"images_url\\\":\\\"https://apitest.wesais.cn/images/20250722/4b721611c41dacfe1fd292a4359a6227.png,https://apitest.wesais.cn/images/20250722/7d4e7f2de29f00a820c9ef2e6bd03abd.png,https://apitest.wesais.cn/images/20250722/34822ac1b4401ddc1cf1095853c2edef.jpg,https://apitest.wesais.cn/images/20250722/4984e66656bca40a15361e2a13a298f6.jpg,https://apitest.wesais.cn/images/20250722/7a86f0759dee029a217a162ecca73460.jpg,https://apitest.wesais.cn/images/20250722/f2f68788e26142841edbdc2c5b82db94.jpg\\\",\\\"invest_type\\\":1,\\\"is_recom\\\":2,\\\"latitude\\\":\\\"22.545838\\\",\\\"longitude\\\":\\\"113.947497\\\",\\\"min_purchase_price\\\":0,\\\"name\\\":\\\"ç®å¡åºé¦\\\",\\\"operator\\\":900002816,\\\"phone\\\":\\\"19973323687\\\",\\\"purpose\\\":\\\"\\\",\\\"resource_tag_ids\\\":\\\"11 10\\\",\\\"resource_tag_names\\\":[\\\"æ å·¥\\\",\\\"å°ååºé¦\\\"],\\\"service_provider\\\":1,\\\"service_related_id\\\":\\\"11801\\\",\\\"service_status\\\":1,\\\"service_type\\\":\\\"stadium_order\\\",\...(truncated,34417 chars)

INFO:utils.dream_assistant_agent:[MCP<-PARSED] tool=getPKYDStadiumList result={"content": [{"type": "text", "text": "{\n \"code\": 200,\n \"message\": ,\n \"data\": {\n \"count\": 55,\n \"page\": 1,\n \"size\": 20,\n \"list\": \"[{\\\"address\\\":\\\"å¹¿ä¸çæ·±å³å¸åå±±åºç§åè·¯\\\",\\\"area_size\\\":\\\"\\\",\\\"c_time\\\":1767922449,\\\"charge_name\\\":\\\"\\\",\\\"charge_phone\\\":\\\"\\\",\\\"community_id\\\":0,\\\"contact_name\\\":\\\"\\\",\\\"contact_phone\\\":\\\"\\\",\\\"contain_count\\\":0,\\\"distance\\\":0,\\\"end_time\\\":2000,\\\"icon\\\":\\\"/HOST/images/member_avatar/20210428/cbb2aa51970aa3dcc9e9c78451b54f72.png\\\",\\\"images\\\":\\\"/HOST/images/20250722/4b721611c41dacfe1fd292a4359a6227.png,/HOST/images/20250722/7d4e7f2de29f00a820c9ef2e6bd03abd.png,/HOST/images/20250722/34822ac1b4401ddc1cf1095853c2edef.jpg,/HOST/images/20250722/4984e66656bca40a15361e2a13a298f6.jpg,/HOST/images/20250722/7a86f0759dee029a217a162ecca73460.jpg,/HOST/images/20250722/f2f68788e26142841edbdc2c5b82db94.jpg\\\",\\\"images_url\\\":\\\"https://apitest.wesais.cn/images/20250722/4b721611c41dacfe1fd292a4359a6227.png,https://apitest.wesais.cn/images/20250722/7d4e7f2de29f00a820c9ef2e6bd03abd.png,https://apitest.wesais.cn/images/20250722/34822ac1b4401ddc1cf1095853c2edef.jpg,https://apitest.wesais.cn/images/20250722/4984e66656bca40a15361e2a13a298f6.jpg,https://apitest.wesais.cn/images/20250722/7a86f0759dee029a217a162ecca73460.jpg,https://apitest.wesais.cn/images/20250722/f2f68788e26142841edbdc2c5b82db94.jpg\\\",\\\"invest_type\\\":1,\\\"is_recom\\\":2,\\\"latitude\\\":\\\"22.545838\\\",\\\"longitude\\\":\\\"113.947497\\\",\\\"min_purchase_price\\\":0,\\\"name\\\":\\\"ç®å¡åºé¦\\\",\\\"operator\\\":900002816,\\\"phone\\\":\\\"19973323687\\\",\\\"purpose\\\":\\\"\\\",\\\"resource_tag_ids\\\":\\\"11 10\\\",\\\"resource_tag_names\\\":[\\\"æ å·¥\\\",\\\"å°ååºé¦\\\"],\\\"service_provider\\\":1,\\\"service_related_id\\\":\\\"11801\\\",\\\"service_status\\\":1,\\\"service_type\\\":\\\"stadium_order\\\",\\\"show_field_name\\\":\\\"\\\",\\\"show_field_pri...(truncated,34368 chars)

INFO:utils.dream_assistant_agent:[TOOL] query_user_stadiums result=场馆总数（原始）：55 1. 皮卡场馆｜广东省深圳市南山区科华路｜电话：19973323687｜项目：游泳 2. 游的皇宫｜广东省深圳市南山区高新南七道1号深圳市数字技术园A-1附近｜电话：19973323687｜项目：乒乓球 3. 深圳篮球场馆-1105｜广东省深圳市南山区深大东路｜电话：19973323687｜项目：未知 4. 0825场馆(文林添加的)｜广东省深圳市南山区南海大道｜电话：15976123893｜项目：篮球、乒乓球 5. 2101006-0721-new场馆(文林添加的)｜广东省深圳市南山区南海大道｜电话：15976123893｜项目：篮球、乒乓球 6. 你好｜广东省深圳市南山区桃园路2号(桃园地铁站A口步行390米)南山区档案服务大厦｜电话：｜项目：乒乓球、书屋 7. 082511｜广东省深圳市南山区清风路南山区南头荔香公园(清风路北)｜电话：｜项目：乒乓球 8. 1231｜广东省深圳市南山区清风路南山区南头荔香公园(清风路东)｜电话：｜项目：乒乓球、体育健康



INFO:httpx:HTTP Request: POST https://api.deepseek.com/v1/chat/completions "HTTP/1.1 200 OK"