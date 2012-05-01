class ScoresController < ApplicationController
  def index
    @scores = Score.all(:order => 'score DESC', :limit => 10)
	respond_to do |format|
		format.json{
			render json @scores
			}
	end
  end
  
  def create
  
  end
end
