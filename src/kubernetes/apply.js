"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.apply = void 0;
var k8s = __importStar(require("@kubernetes/client-node"));
var fs = __importStar(require("fs"));
var yaml = __importStar(require("js-yaml"));
var util_1 = require("util");
/**
 * Replicate the functionality of `kubectl apply`.  That is, create the resources defined in the `specFile` if they do
 * not exist, patch them if they do exist.
 *
 * @param specPath File system path to a YAML Kubernetes spec.
 * @return Array of resources created
 */
function apply(specPath) {
    return __awaiter(this, void 0, void 0, function () {
        var kc, client, fsReadFileP, specString, specs, validSpecs, created, _i, validSpecs_1, spec, response, e_1, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    kc = new k8s.KubeConfig();
                    kc.loadFromDefault();
                    client = k8s.KubernetesObjectApi.makeApiClient(kc);
                    fsReadFileP = (0, util_1.promisify)(fs.readFile);
                    return [4 /*yield*/, fsReadFileP(specPath, 'utf8')];
                case 1:
                    specString = _a.sent();
                    specs = yaml.loadAll(specString);
                    validSpecs = specs.filter(function (s) { return s && s.kind && s.metadata; });
                    created = [];
                    _i = 0, validSpecs_1 = validSpecs;
                    _a.label = 2;
                case 2:
                    if (!(_i < validSpecs_1.length)) return [3 /*break*/, 9];
                    spec = validSpecs_1[_i];
                    spec.metadata = spec.metadata || {};
                    spec.metadata.annotations = spec.metadata.annotations || {};
                    delete spec.metadata.annotations['kubectl.kubernetes.io/last-applied-configuration'];
                    spec.metadata.annotations['kubectl.kubernetes.io/last-applied-configuration'] = JSON.stringify(spec);
                    _a.label = 3;
                case 3:
                    _a.trys.push([3, 6, , 8]);
                    // try to get the resource, if it does not exist an error will be thrown and we will end up in the catch
                    // block.
                    return [4 /*yield*/, client.read(__assign(__assign({}, spec), { metadata: { name: spec.metadata.name, namespace: spec.metadata.namespace } }))];
                case 4:
                    // try to get the resource, if it does not exist an error will be thrown and we will end up in the catch
                    // block.
                    _a.sent();
                    return [4 /*yield*/, client.patch(spec)];
                case 5:
                    response = _a.sent();
                    created.push(response.body);
                    return [3 /*break*/, 8];
                case 6:
                    e_1 = _a.sent();
                    return [4 /*yield*/, client.create(spec)];
                case 7:
                    response = _a.sent();
                    created.push(response.body);
                    return [3 /*break*/, 8];
                case 8:
                    _i++;
                    return [3 /*break*/, 2];
                case 9: return [2 /*return*/, created];
            }
        });
    });
}
exports.apply = apply;
apply("/home/thimo/Masterarbeit/edger_dgea/test-pod.yml").then(function (res) { return console.log(res); });
