"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Build = exports.Compilation = exports.SCM = exports.Source = exports.VersionInfo = exports.Settings = exports.Details = exports.Algorithm = void 0;
class Algorithm {
    constructor(id, name, details, settings, version_info, source, compilation, build, self_link, resource_type) {
        this.id = id;
        this.name = name;
        this.details = details;
        this.settings = settings;
        this.version_info = version_info;
        this.source = source;
        this.compilation = compilation;
        this.build = build;
        this.self_link = self_link;
        this.resource_type = resource_type;
    }
    //for testing
    createTestAlgo() {
        let requestObject = {
            "details": {
                "label": "My First Algorithm"
            },
            "name": "my_first_algorithm",
            "settings": {
                "environment": "cpu",
                "language": "python3-1",
                "license": "apl",
                "network_access": "full",
                "pipeline_enabled": true,
                "source_visibility": "closed"
            }
        };
        return requestObject;
    }
}
exports.Algorithm = Algorithm;
class Details {
    constructor(label, summary, tagline) {
        this.label = label;
        this.summary = summary;
        this.tagline = tagline;
    }
}
exports.Details = Details;
class Settings {
    constructor(algorithm_callability, environment, language, licence, network_access, package_set, pipeline_enabled, source_visibility) {
        this.algorithm_callability = algorithm_callability;
        this.environment = environment;
        this.language = language;
        this.licence = licence;
        this.network_access = network_access;
        this.package_set = package_set;
        this.pipeline_enabled = pipeline_enabled;
        this.source_visibility = source_visibility;
    }
}
exports.Settings = Settings;
class VersionInfo {
    constructor(git_hash, release_notes, sample_input, sample_output, semantic_version) {
        this.git_hash = git_hash;
        this.release_notes = release_notes;
        this.sample_input = sample_input;
        this.sample_output = sample_output;
        this.semantic_version = semantic_version;
    }
}
exports.VersionInfo = VersionInfo;
class Source {
    constructor(repository_https_url, repository_name, repository_owner, repository_ssh_url, scm) {
        this.repository_https_url = repository_https_url;
        this.repository_name = repository_name;
        this.repository_owner = repository_owner;
        this.repository_ssh_url = repository_owner;
        this.repository_ssh_url = repository_ssh_url;
        this.scm = scm;
    }
}
exports.Source = Source;
class SCM {
    constructor(_default, enabled, id, oauth, provider, urls) {
        this.default = _default;
        this.enabled = enabled;
        this.id = id;
        this.oauth = oauth;
        this.provider = provider;
        this.urls = urls;
    }
}
exports.SCM = SCM;
class OAuth {
    constructor(client_id) {
        this.client_id = client_id;
    }
}
class URLS {
    constructor(api, ssh, web) {
        this.api = api;
        this.ssh = ssh;
        this.web = web;
    }
}
class Compilation {
    constructor(output, successful) {
        this.output = output;
        this.successful = successful;
    }
}
exports.Compilation = Compilation;
class Build {
    constructor(build_id, commit_sha, finished_at, resource_type, started_at, status, version_info) {
        this.build_id = build_id;
        this.commit_sha = commit_sha;
        this.finished_at = finished_at;
        this.resource_type = resource_type;
        this.started_at = started_at;
        this.status = status;
        this.version_info = version_info;
    }
}
exports.Build = Build;
//# sourceMappingURL=Algorithm.js.map