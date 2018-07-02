var Host = {
    req: function(url, param, onSucc, onFail) {
        if (param != null) {
            param.userKey = MF.env("userKey")
        } else {
            param = { userKey: MF.env("userKey") }
        }
        common.req("app" + url, param, onSucc, onFail)
    }
}

//var MF = {
//    env: () => {},
//    setTitle: () => {}
//}

var APP = {
    callback(val) {
        if (APP.onSucc)
            APP.onSucc(val)
    },
    pick(type, vals, onSucc) {
        APP.onSucc = onSucc
        MF.pick(type, JSON.stringify(vals))
    },
    pop(uri, height, onSucc) {
        APP.onSucc = onSucc
        MF.pop(uri, height)
    },
    back(val) {
        MF.back(val)
    },
    login(loginName, pwd, onSucc, onFail) {
        Host.req("/user/login.json", { loginName: loginName, password: pwd }, onSucc, onFail)
    },
    dict(code, onSucc) {
        Host.req("/dict/view.json", { company: "nciapp", name: code }, onSucc)
    },
   list(url, postData, onSucc) {
      Host.req(url, postData, onSucc)
    },
    openApply(url, onSucc) {
        Host.req(url, {type: 2}, onSucc)
    },
    toMapDict(dict) {
        if (dict instanceof Array) {
            var r = {}
            dict.map(v => {
                r[v.code] = v.text
            })
            return r
        } else {
            return dict
        }
    }
}

if (typeof Customer == "object") {
    Customer.host = Host;
    APP.customer = Customer;
}

if (typeof Proposal == "object") {
    Proposal.host = Host;
    APP.proposal = Proposal;
}

if (typeof Apply == "object") {
    Apply.host = Host;
    APP.apply = Apply;
}

