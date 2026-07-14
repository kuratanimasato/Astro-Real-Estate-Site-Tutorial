# GitHub Actions CI/CD パイプライン

## 概要

このプロジェクトでは、GitHub Actionsを使用してCI/CDパイプラインを構成しています。

## ワークフロー構成

### トリガー条件
- `main`ブランチへのプッシュ
- `main`ブランチへのプルリクエスト

### ジョブ1: テスト (Test)
テストジョブは毎回実行されます。

**実行内容:**
1. コードのチェックアウト
2. Node.js 22.xのセットアップ
3. 依存関係のインストール (`npm ci`)
4. ユニットテストの実行 (`npm test` - Vitestを使用)
5. Astroプロジェクトのビルド検証 (`npm run build`)
6. ビルド成果物（dist/）をアーティファクトとしてアップロード

### ジョブ2: デプロイ (Deploy)
デプロイジョブはテストジョブが成功した場合のみ実行されます。

**実行条件:**
- テストジョブの成功 (`needs: test`)
- `main`ブランチへの直接プッシュのみ（プルリクエストでは実行されない）
- パイプラインが成功している状態

**実行内容:**
1. コードのチェックアウト
2. Node.js 22.xのセットアップ
3. 依存関係のインストール
4. Astroプロジェクトのビルド
5. GitHub Pagesへのデプロイ（`peaceiris/actions-gh-pages`アクションを使用）

## セキュリティ

- **認証情報**: GitHub Actionsの組み込み`GITHUB_TOKEN`シークレットのみを使用
- **シークレット管理**: デプロイに必要なその他のシークレットについては、GitHubリポジトリ設定の「Secrets and variables」セクションで設定してください
- **権限制限**: デプロイはmainブランチへの直接プッシュのみに制限

## 使用方法

### 1. リポジトリのセットアップ

```bash
# このワークフローファイルをリポジトリに配置
# .github/workflows/ci-cd.yml
```

### 2. GitHub Pages設定（デプロイを有効にする場合）

1. GitHubリポジトリ設定 → Settings → Pages
2. Source: "GitHub Actions"を選択
3. カスタムドメイン（必要に応じて）を設定

### 3. 開発フロー

```bash
# 機能ブランチで開発
git checkout -b feature/your-feature

# コードをコミット・プッシュ
git push origin feature/your-feature

# プルリクエストを作成 → テストが自動実行
# レビュー → マージ → デプロイが自動実行
```

## ワークフローファイルの場所

- **ファイル**: `.github/workflows/ci-cd.yml`
- **リポジトリにコミット**: `git add .github/workflows/ci-cd.yml && git commit -m "Add GitHub Actions CI/CD pipeline"`

## 注記

- Vitestを使用したユニットテスト
- Astroフレームワークによるスタティックサイト生成
- GitHub Pages自動デプロイ対応
- Node.js 22.x（LTS）をターゲット

## トラブルシューティング

### デプロイが実行されない場合

1. mainブランチへのプッシュか確認
2. テストジョブが成功しているか確認
3. GitHub Pages設定がGitHub Actionsになっているか確認
4. リポジトリ権限とワークフロー実行権限を確認

### テストが失敗する場合

1. ローカルで `npm test` を実行して動作確認
2. 依存関係のバージョンを確認
3. Node.js 22.x以上がインストールされているか確認
