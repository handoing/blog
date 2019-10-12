---
title: 基于Github Action构建Flutter应用
date: 2019/10/12
type: post
tag:
  - Flutter
  - Github
meta:
  -
    name: description
    content: github actions demo for flutter
  -
    name: keywords
    content: flutter, github actions
---

## 1.GitHub Actions是什么？

GitHub Actions是Github的持续集成服务，类似于Jenkins、Travis CI之类的工具，帮助开发者从Github构建、测试和部署代码，我们可以通过Github的事件机制（push等）启动workflow。

<!-- more -->

actions类似于脚本文件，帮助开发者构建workflow，我们可以通过Github的[Marketplace](https://github.com/marketplace?type=actions)查找他人贡献的actions，也可以根据自己项目自定义actions。

actions不仅可以用于构建和部署，还可以做其他事情，因为它就是跑在docker容器中的脚本，想做什么取决于你自己。

目前GitHub Actions还没有全面开放，需要我们去[申请](https://github.com/features/actions/signup)，等待官方审核通过，大约需要几天的时间，审核通过会收到通知，同时你会看到项目里多了一个Actions的tab。

![Actions](/github_action_flutter_demo/i1.png)

## 2.通过GitHub Actions构建Flutter的Android应用

首先创建一个flutter应用，我拿Android Studio默认创建的flutter项目为例，提交到github仓库（[https://github.com/handoing/github_action_flutter_demo](https://github.com/handoing/github_action_flutter_demo)）

进入Actions如图：

![Actions](/github_action_flutter_demo/i2.png)

目前我们还没有创建workflow，可以直接在项目本地创建一个```.github/workflows```目录并创建build.ymal文件，把文件提交到github仓库，或直接通过github创建一个workflow，这里我们直接通过github创建workflow，点击Set up a workflow yourself，并编写yaml文件。
关于如何编写yaml这里不做介绍，大家可以直接看[官方文档](https://help.github.com/en/articles/workflow-syntax-for-github-actions)。

如图：

![workflow](/github_action_flutter_demo/i3.png)

修改build.yaml

```yaml
name: CI

on: [push]

jobs:
  test:
    name: Test on ${{ matrix.os }}
    runs-on: ${{ matrix.os }}
    strategy:
      matrix:
        os: [ubuntu-latest]
        # os: [ubuntu-latest, windows-latest, macos-latest]
    steps:
      - uses: actions/checkout@v1
      - uses: actions/setup-java@v1
        with:
          java-version: '12.x'
      - uses: subosito/flutter-action@v1
        with:
          flutter-version: '1.9.1+hotfix.4'
          channel: 'stable'
      - run: flutter build apk
      - name: upload artifects
        uses: actions/upload-artifact@master
        with:
          name: flutter-android-demo
          path: build/app/outputs/apk/release
```

这里解释下build.yaml文件执行步骤：

- 我们创建了一个名为CI的workflow
- 当push代码时会触发jobs
- 创建一个test的job，设置了name及runs-on，这里用到了matrix里定义的os，目前我们只使用了ubuntu系统，我们还可以添加多个操作系统
- 通过actions/checkout拉取我们代码
- 通过actions/setup-java构建java环境
- 通过subosito/flutter-action构建flutter环境
- 通过actions/upload-artifact打包我们的指定路径的文件夹上传到artifects

点击Start commit提交commit，此时会触发workflow构建，我们接着点击项目Actions会看到对应workflow正在构建，如图：

![workflow](/github_action_flutter_demo/i4.png)

点击CI可以查看对应的构建步骤及日志信息，如图：

![workflow](/github_action_flutter_demo/i5.png)

当workflow执行完毕后我们可以通过点击右上角的Artifacts下载我们上传的编译产物，如图：

![workflow](/github_action_flutter_demo/i6.png)

## 总结

Github Actions适用于Github上大部分开源项目，避免了依赖Travis CI或Circle CI等第三方CI/CD工具，给开发者提供了便利的workflow，但目前Github Actions还处于测试阶段，期待后续开放。