const fs = require('fs');
const path = require('path');

const sbPath = path.join(__dirname, '..', 'springboot.html');
let content = fs.readFileSync(sbPath, 'utf8');

const marker = 'Transactional Outbox Pattern';
const idx = content.indexOf(marker);

if (idx === -1) {
  console.log('Marker not found in springboot.html');
  process.exit(1);
}

// Find closing </div> of that question card
const cardCloseIdx = content.indexOf('</div>\n        </div>', idx) !== -1 
  ? content.indexOf('</div>\n        </div>', idx)
  : content.indexOf('</div>\r\n        </div>', idx);

if (cardCloseIdx === -1) {
  console.log('Card close not found');
  process.exit(1);
}

const insertPos = cardCloseIdx + (content[cardCloseIdx + 6] === '\r' ? 22 : 20);

const springBootProgramsHtml = `

        <!-- SECTION 3: RECENTLY ASKED SPRING BOOT CODING PROGRAMS -->
        <div class="col-12 my-5 pt-4">
          <div class="level-badge advance mb-2" style="background: linear-gradient(135deg, #059669 0%, #10b981 100%); color: #fff;"><i class="ti-code mr-1"></i> PART 3: SPRING BOOT CODING PROGRAMS (RECENTLY ASKED IN INTERVIEWS)</div>
          <h2 class="level-heading">Spring Boot Real-World Coding &amp; Architecture Programs <span class="badge badge-success font-weight-normal text-white" style="font-size: 13px; vertical-align: middle;">Production &bull; 2026 Specs</span></h2>
          <p class="text-secondary">Hand-picked coding implementations frequently asked in Senior &amp; Tech Lead Spring Boot interviews.</p>
          <div class="border-bottom border-primary mb-4" style="opacity: 0.25;"></div>
        </div>

        <div class="col-12 mb-4">
          <div class="interview-section-card advance-card">
            <span class="advance-tag">Spring Boot Coding &bull; RFC 7807</span>
            <h3 class="text-dark font-weight-bold mb-3">Program 1: Production-Grade Global Exception Handler with ProblemDetail (RFC 7807)</h3>
            <p>Asked across Tier-1 tech interviews. Replaces legacy unstructured error maps with standard HTTP Problem Details.</p>
            <pre><code class="language-java">import org.springframework.http.*;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;
import java.net.URI;
import java.time.Instant;
import java.util.*;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ResourceNotFoundException.class)
    public ProblemDetail handleResourceNotFound(ResourceNotFoundException ex) {
        ProblemDetail problem = ProblemDetail.forStatusAndDetail(HttpStatus.NOT_FOUND, ex.getMessage());
        problem.setTitle("Resource Not Found");
        problem.setType(URI.create("https://api.technointerview.com/errors/not-found"));
        problem.setProperty("timestamp", Instant.now());
        return problem;
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ProblemDetail handleValidationErrors(MethodArgumentNotValidException ex) {
        ProblemDetail problem = ProblemDetail.forStatusAndDetail(HttpStatus.BAD_REQUEST, "Validation failed for request payload");
        problem.setTitle("Invalid Request Content");
        
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getFieldErrors().forEach(err -> 
            errors.put(err.getField(), err.getDefaultMessage()));
            
        problem.setProperty("fieldErrors", errors);
        problem.setProperty("timestamp", Instant.now());
        return problem;
    }
}</code></pre>
          </div>
        </div>

        <div class="col-12 mb-4">
          <div class="interview-section-card advance-card">
            <span class="advance-tag">Spring Boot Coding &bull; Bean Validation</span>
            <h3 class="text-dark font-weight-bold mb-3">Program 2: Custom Validation Annotation (@ValidPhoneNumber) with ConstraintValidator</h3>
            <p>How to author declarative custom validation logic integrated with Hibernate Validator and Spring MVC.</p>
            <pre><code class="language-java">import jakarta.validation.*;
import java.lang.annotation.*;

// 1. Define custom annotation
@Target({ElementType.FIELD, ElementType.PARAMETER})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = PhoneNumberValidator.class)
@Documented
public @interface ValidPhoneNumber {
    String message() default "Invalid phone number format. Must start with + and country code";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}

// 2. Implement ConstraintValidator
class PhoneNumberValidator implements ConstraintValidator<ValidPhoneNumber, String> {
    private static final String PHONE_REGEX = "^\\\\+[1-9]\\\\d{1,14}$"; // E.164 standard

    @Override
    public boolean isValid(String phone, ConstraintValidatorContext context) {
        if (phone == null || phone.isBlank()) return false;
        return phone.matches(PHONE_REGEX);
    }
}

// 3. Usage inside DTO
record UserRegistrationRequest(
    String name,
    @ValidPhoneNumber String contactNumber
) {}</code></pre>
          </div>
        </div>

        <div class="col-12 mb-4">
          <div class="interview-section-card advance-card">
            <span class="advance-tag">Spring Boot Coding &bull; Resilience</span>
            <h3 class="text-dark font-weight-bold mb-3">Program 3: In-Memory Token Bucket Rate Limiter HandlerInterceptor</h3>
            <p>Guards REST APIs against DoS and abusive scraping using a concurrent token bucket algorithm.</p>
            <pre><code class="language-java">import jakarta.servlet.http.*;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import java.util.concurrent.*;
import java.util.concurrent.atomic.AtomicInteger;

@Component
public class RateLimiterInterceptor implements HandlerInterceptor {
    private static final int MAX_TOKENS = 50;
    private static final long REFILL_INTERVAL_MS = 60000; // 1 minute
    
    private final ConcurrentHashMap<String, TokenBucket> buckets = new ConcurrentHashMap<>();

    @Override
    public boolean preHandle(HttpServletRequest req, HttpServletResponse res, Object handler) throws Exception {
        String clientIp = req.getRemoteAddr();
        TokenBucket bucket = buckets.computeIfAbsent(clientIp, k -> new TokenBucket(MAX_TOKENS, REFILL_INTERVAL_MS));

        if (!bucket.tryConsume()) {
            res.setStatus(429); // Too Many Requests
            res.setHeader("Retry-After", "60");
            res.getWriter().write("{\\"error\\":\\"Rate limit exceeded. Try again in 60s.\\"}");
            return false;
        }
        return true;
    }

    static class TokenBucket {
        private final int capacity;
        private final long refillInterval;
        private final AtomicInteger tokens;
        private volatile long lastRefillTimestamp;

        public TokenBucket(int cap, long interval) {
            this.capacity = cap;
            this.refillInterval = interval;
            this.tokens = new AtomicInteger(cap);
            this.lastRefillTimestamp = System.currentTimeMillis();
        }

        public synchronized boolean tryConsume() {
            refill();
            if (tokens.get() > 0) {
                tokens.decrementAndGet();
                return true;
            }
            return false;
        }

        private void refill() {
            long now = System.currentTimeMillis();
            if (now - lastRefillTimestamp > refillInterval) {
                tokens.set(capacity);
                lastRefillTimestamp = now;
            }
        }
    }
}</code></pre>
          </div>
        </div>

        <div class="col-12 mb-4">
          <div class="interview-section-card advance-card">
            <span class="advance-tag">Spring Boot Coding &bull; Spring Data JPA</span>
            <h3 class="text-dark font-weight-bold mb-3">Program 4: Dynamic Multi-Criteria Search with Spring Data JPA Specification</h3>
            <p>Avoids writing 20 static JPQL query combinations by utilizing Criteria API specifications dynamically.</p>
            <pre><code class="language-java">import org.springframework.data.jpa.domain.Specification;
import jakarta.persistence.criteria.Predicate;
import java.util.*;

public class ProductSpecifications {
    public static Specification<Product> filterByCriteria(String name, Double minPrice, Double maxPrice, String category) {
        return (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();

            if (name != null && !name.isBlank()) {
                predicates.add(cb.like(cb.lower(root.get("name")), "%" + name.toLowerCase() + "%"));
            }
            if (minPrice != null) {
                predicates.add(cb.greaterThanOrEqualTo(root.get("price"), minPrice));
            }
            if (maxPrice != null) {
                predicates.add(cb.lessThanOrEqualTo(root.get("price"), maxPrice));
            }
            if (category != null && !category.isBlank()) {
                predicates.add(cb.equal(root.get("category"), category));
            }

            return cb.and(predicates.toArray(new Predicate[0]));
        };
    }
}

// Controller usage:
// productRepo.findAll(ProductSpecifications.filterByCriteria(name, min, max, cat), pageable);</code></pre>
          </div>
        </div>

        <div class="col-12 mb-4">
          <div class="interview-section-card advance-card">
            <span class="advance-tag">Spring Boot 3 &bull; Modern REST Client</span>
            <h3 class="text-dark font-weight-bold mb-3">Program 5: Modern Synchronous &amp; Resilient Client using Spring Boot 3 RestClient</h3>
            <p>Spring 6 introduced <code>RestClient</code> as the modern fluent alternative to legacy <code>RestTemplate</code> without WebFlux overhead.</p>
            <pre><code class="language-java">import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;
import org.springframework.http.MediaType;
import java.time.Duration;

@Service
public class OrderPaymentClient {
    private final RestClient restClient;

    public OrderPaymentClient(RestClient.Builder builder) {
        this.restClient = builder
            .baseUrl("https://payment.technointerview.com/api/v1")
            .defaultHeader("Accept", MediaType.APPLICATION_JSON_VALUE)
            .build();
    }

    public PaymentResponse processTransaction(PaymentRequest request) {
        return restClient.post()
            .uri("/charges")
            .contentType(MediaType.APPLICATION_JSON)
            .body(request)
            .retrieve()
            .onStatus(status -> status.is4xxClientError(), (req, res) -> {
                throw new PaymentClientException("Payment failed with client error: " + res.getStatusCode());
            })
            .onStatus(status -> status.is5xxServerError(), (req, res) -> {
                throw new PaymentGatewayException("Gateway unavailable, trigger circuit breaker.");
            })
            .body(PaymentResponse.class);
    }
}</code></pre>
          </div>
        </div>`;

const newContent = content.slice(0, insertPos) + springBootProgramsHtml + content.slice(insertPos);
fs.writeFileSync(sbPath, newContent, 'utf8');
console.log('Appended Spring Boot coding programs successfully! New size: ' + fs.statSync(sbPath).size);
