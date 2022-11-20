import pandas as pd
import numpy as np
import requests
import json
import pymongo

def http_post_cate(param): # get up to 100 products of one categories
    url = "http://api.lamysolution.com:7001/aliexpress/findsummaries"
    code = param # code of the categories
    requestData = {
        "member":{
            "application":{
                "programming":{
                    "_interface":{
                        "key":"6D2ACAEC59D1E06955C4BCE4FC0B8A23"
                    }
                }
            }
        },
        "category":
        {
            "codes":code
        },
    }
    requestData = json.dumps(requestData)
    head = {'Content-Type': 'application/json; charset=UTF-8'}
    
    res = requests.post(url, data = requestData, headers= head)
    response = res.json() 
    # print(response) # dict

    return response

def http_post_prod(param): # get info of one product
    url = "http://api.lamysolution.com:7001/aliexpress/findproducts"
    code = param # code of the product
    requestData = {
        "member":{
            "application":{
                "programming":{
                    "_interface":{
                        "key":"6D2ACAEC59D1E06955C4BCE4FC0B8A23"
                    }
                }
            }
        },
        "summary":
        {
            "codes":code
        },
    }
    requestData = json.dumps(requestData)
    head = {'Content-Type': 'application/json; charset=UTF-8'}
    
    res = requests.post(url, data = requestData, headers= head)
    response = res.json()
    # print(response) # dict

    return response

def process_data(prod_info):
    info = {}
    info["name"] = prod_info["title"]
    info["addr"] = prod_info["address"]
    price = prod_info["sale"]
    info["min_price"] = price["min"]["price"]["amount"]
    info["min_currency"] = price["min"]["price"]["currency"]
    info["max_price"] = price["max"]["price"]["amount"]
    info["max_currency"] = price["max"]["price"]["currency"]

    if prod_info["option"] != None:
        option = prod_info["option"]["stocks"] # list
        option_count = len(option)
        info["option"] = []
        for i in range(option_count):
            option_info = {}
            option_info_ori = option[i]
            option_info["name"] = option_info_ori["names"]
            option_info["price"] = option_info_ori["price"]["amount"]
            option_info["currency"] = option_info_ori["price"]["currency"]
            option_info["quantity"] = int(option_info_ori["quantity"])
            info["option"].append(option_info)
    else: 
        info["option"] = None
    
    info["img"] = []
    info["description"] = []
    content_all = prod_info["detail"]["page"]["contents"] # list
    content_count = len(content_all)
    for i in range(content_count):
        content = content_all[i] # dict
        name = content["name"]
        value = content["value"]
        if name == "#text":
            info["description"].append(value)
        if name == "img":
            info["img"].append(value)
    # print(info)
    return info

myclient = pymongo.MongoClient("mongodb+srv://yuehengggg:1004866wyh1103A@stylist.59vtveq.mongodb.net/?retryWrites=true&w=majority")
mydb = myclient["Men"]

path = "F:\Korea 500\your_styliest\server\men.csv"
df = pd.read_csv(path)
cate_code_lst = df["code"].to_numpy()
cate_name_lst = df["name"].to_numpy()
for i in range(len(cate_code_lst)):

    cate_name = cate_name_lst[i]
    # print(cate_name)
    # print(cate_code_lst[i])
    mycol = mydb[cate_name]

    cate_info = http_post_cate(cate_code_lst[i]) # dict
    cate_sum = cate_info["summaries"] # list
    prod_count = cate_info["count"] # cout of products returned
    for i in range(prod_count):
        # prod_info = cate_sum[i] # dict
        # print(prod_info)
        
        code = cate_sum[i]["code"]
        print(code)
        prod_info_all = http_post_prod(code)
        if prod_info_all["products"] != []:
            prod_info = process_data(prod_info_all["products"][0])
            x = mycol.insert_one(prod_info) 
            print(x)
           
        else:
            continue