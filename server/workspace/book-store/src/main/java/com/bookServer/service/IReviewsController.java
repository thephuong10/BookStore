package com.bookServer.service;

//@RestController
public class IReviewsController {

//	@Autowired
//	private IReviewsService iReviewsService;
//	
//	@Autowired
//	private ObjectMapper mapper;
//	
//	@Autowired
//	private HandleFile handleFile;
//	
//	@GetMapping("/api/reviews/get/all/book")
//	public ResponseEntity<?> getAllByBook(@RequestParam(name = "pageable") String json) {
//
//		try {
//
//			PageableRequest payload = mapper.readValue(json, PageableRequest.class).compact();
//
//			payload.getPaging().updateTotalItem(iReviewsService.count(payload.getFilters(),true));
//
//			payload.setData(iReviewsService.getAll(payload,true));
//
//			return ResponseEntity.status(200).body(payload);
//
//		} catch (JsonProcessingException e) {
//			// TODO Auto-generated catch block
//			e.printStackTrace();
//			return ResponseEntity.status(500).body(MessageConstant.Response.SC_INTERNAL_SERVER_ERROR);
//		}
//
//	}
//	
//	@GetMapping("/api/reviews/get/all")
//	public ResponseEntity<?> getAll(@RequestParam(name = "pageable") String json) {
//
//		try {
//
//			PageableRequest payload = mapper.readValue(json, PageableRequest.class).compact();
//
//			payload.getPaging().updateTotalItem(iReviewsService.count(payload.getFilters(),false));
//
//			payload.setData(iReviewsService.getAll(payload,false));
//
//			return ResponseEntity.status(200).body(payload);
//
//		} catch (JsonProcessingException e) {
//			// TODO Auto-generated catch block
//			e.printStackTrace();
//			return ResponseEntity.status(500).body(MessageConstant.Response.SC_INTERNAL_SERVER_ERROR);
//		}
//
//	}
//	
//	@PatchMapping("/api/reviews")
//	@PreAuthorize("hasAnyRole('ADMIN_REVIEWS','ADMIN_FULL')")
//	public ResponseEntity<?> updateStatus(@RequestParam(name = "id") Long id,
//										  @RequestParam(name = "status") String status) {
//
//		try {
//			
//			ReviewsEntity reviewsEntity = iReviewsService.findAllById(id);
//			
//			if(reviewsEntity != null) {
//				
//				List<ReviewsCase>reviewsCases=new ArrayList<>(Arrays.asList(ReviewsCase.values()));
//				
//				if(reviewsCases.stream().filter(i->i.toString().equals(status)).count() > 0) {
//					
//					reviewsEntity.setStatus(status);
//					
//					
//					iReviewsService.saveOrUpdate(reviewsEntity,null);
//					
//					return ResponseEntity.ok(MessageConstant.Response.SC_OK);
//					
//				}
//				
//			}
//			
//			return ResponseEntity.status(400).body(MessageConstant.Response.SC_BAD);
//			
//
//		} catch (Exception e) {
//			// TODO Auto-generated catch block
//			e.printStackTrace();
//			return ResponseEntity.status(500)
//					.body(MessageConstant.Response.SC_INTERNAL_SERVER_ERROR);
//		}
//
//	}
//	
//	@DeleteMapping("/api/reviews")
//	@PreAuthorize("hasAnyRole('ADMIN_REVIEWS','ADMIN_FULL')")
//	public ResponseEntity<?> delete(@RequestBody List<Long> ids) {
//
//		try {
//			
//			
//			if(iReviewsService.removes(ids)) {
//				
//				return ResponseEntity.ok(MessageConstant.Response.SC_OK);
//				
//			}
//
//			return ResponseEntity.status(400).body(Collections.singletonMap("message", MessageConstant.Response.SC_BAD));
//
//		} catch (Exception e) {
//			
//			return ResponseEntity
//					.status(400)
//					.body(Collections.singletonMap("message", e.getMessage()));
//		}
//	}
//	
//	@PostMapping("/auth/api/reviews")
//	@PreAuthorize("hasRole('CUSTOMER')")
//	public ResponseEntity<?> create(@RequestParam(name = "entity") String json,
//			@RequestParam(name = "files") List<MultipartFile> files,
//			@AuthenticationPrincipal UserPrincipal user) {
//
//		try {
//			
//			
//			ReviewsEntity reviews = mapper.readValue(json, ReviewsEntity.class);
//			
//			reviews.setStatus(ReviewsCase.PENDING.toString());
//			
//			addImages(files, reviews);
//			
//			iReviewsService.saveOrUpdate(reviews, user.getUserDetailId());
//			
//			return ResponseEntity
//					.ok(MessageConstant.Response.SC_OK);
//
//		} catch (Exception e) {
//			
//			return ResponseEntity
//					.status(400)
//					.body(Collections.singletonMap("message", e.getMessage()));
//		}
//	}
//	
//	private boolean addImages(List<MultipartFile> files, ReviewsEntity reviews) {
//
//		boolean flag = false;
//
//		try {
//			
//
//			if (files != null && files.size() > 0) {
//
//				List<String> resultFile = new ArrayList<>();
//
//				for (MultipartFile file : files) {
//
//					String url = handleFile.upload(file.getBytes());
//
//					if (StringUtils.hasText(url)) {
//
//						resultFile.add(url);
//
//						flag = true;
//					}
//
//				}
//
//				if (flag) {
//					
//					reviews.setImages(resultFile);
//
//				}
//
//			}
//
//		} catch (IOException e) {
//
//			e.printStackTrace();
//		}
//
//		return flag;
//	}
}
