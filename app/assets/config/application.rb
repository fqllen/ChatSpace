module PairsLike
  class Application < Rails::Application
    # ここから下を追加
    config.generators do |g|
      g.javascripts false
      g.helper false
      g.test_framework false
    end
  end
end
